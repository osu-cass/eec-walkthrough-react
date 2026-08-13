const {pool} = require("../services/database/mysqlPool");

// insert every item of a training page with a single bulk statement
async function insertTrainingPageItems(connection, pageId, itemList) {
  if (!itemList.length) {
    return;
  }

  const query = "INSERT INTO TrainingPageItems " +
    "(trainingPageId, itemId, annotation) VALUES ?";
  // validation allows a missing or null annotation, both of which store as NULL
  const rows = itemList.map(item => [
    pageId,
    item.id,
    typeof item.annotation === "string" ? item.annotation : null
  ]);

  await connection.query(query, [rows]);
}

async function createTrainingPage(itemList, name, description, viewers, sourcePageId, category) {
  const insertPageQuery = "INSERT INTO TrainingPages " +
    "(name, description, viewers, category, sourcePageId) " +
    "VALUES (?, ?, ?, ?, ?)";
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const connection = await pool.getConnection();
  let transactionStarted = false;

  try {
    await connection.beginTransaction();
    transactionStarted = true;
    const [insertResult] = await connection.query(insertPageQuery, [
      name,
      description,
      viewers,
      capitalizedCategory,
      sourcePageId
    ]);
    const pageId = insertResult.insertId;
    await insertTrainingPageItems(connection, pageId, itemList);
    await connection.commit();
    return {id: pageId};
  } catch (err) {
    if (transactionStarted) {
      await connection.rollback();
    }
    throw err;
  } finally {
    connection.release();
  }
}
module.exports.createTrainingPage = createTrainingPage;

async function updateTrainingPage(pageId, itemList, name, description, viewers, sourcePageId, category) {
  const getPageQuery = "SELECT id FROM TrainingPages WHERE id = ? FOR UPDATE";
  const updatePageQuery = "UPDATE TrainingPages SET name = ?, description = ?, " +
    "viewers = ?, category = ?, sourcePageId = ? WHERE id = ?";
  const deletePageItemsQuery = "DELETE FROM TrainingPageItems WHERE trainingPageId = ?";
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const connection = await pool.getConnection();
  let transactionStarted = false;

  try {
    await connection.beginTransaction();
    transactionStarted = true;
    const [[page]] = await connection.query(getPageQuery, [pageId]);

    if (!page) {
      await connection.rollback();
      transactionStarted = false;
      return null;
    }

    await connection.query(updatePageQuery, [
      name,
      description,
      viewers,
      capitalizedCategory,
      sourcePageId,
      pageId
    ]);
    await connection.query(deletePageItemsQuery, [pageId]);
    await insertTrainingPageItems(connection, pageId, itemList);
    await connection.commit();

    return {id: parseInt(pageId, 10)};
  } catch (err) {
    if (transactionStarted) {
      await connection.rollback();
    }
    throw err;
  } finally {
    connection.release();
  }
}
module.exports.updateTrainingPage = updateTrainingPage;

async function getTrainingPage(pageId) {
  const result = {pageId: parseInt(pageId)};
  const getPageInfoQuery = `SELECT * FROM TrainingPages WHERE id = ?`;
  const getItemList = `
		SELECT 
			itemId, 
			cardId, cardType, Cards.orderIndex AS cardOrderIndex, Cards.title AS cardTitle, 
			headerId, pageId AS originalPageId, Headers.orderIndex AS headerOrderIndex, Headers.title AS headerTitle   
		FROM TrainingPageItems 
		INNER JOIN Items using (itemId)
		INNER JOIN Cards using (cardId)
		INNER JOIN Headers using (headerId)
		WHERE trainingPageId =  ?
		ORDER BY Headers.orderIndex ASC
		`;

  try {
    const [[pageInfo]] = await pool.query(getPageInfoQuery, [pageId]);
    if (!pageInfo) {
      return {
        error: "Invalid training page ID"
      };
    }

    result.pageTitle = pageInfo.name;
    result.sourcePageId = pageInfo.sourcePageId;
    result.description = pageInfo.description;
    result.category = pageInfo.category.toLowerCase();
    result.viewers = pageInfo.viewers;

    const [itemList] = await pool.query(getItemList, [pageId]);
    result.sections = [];
    // add distinct headers with empty cards into result
    itemList.forEach(item => {
      const existingSection = result.sections.find(
        section => section.id === item.headerId
      );
      if (!existingSection) {
        result.sections.push({
          id: item.headerId,
          title: item.headerTitle,
          orderIndex: item.headerOrderIndex,
          cards: []
        });
      }
    });

    // add distinct cards into appropriate headers
    itemList.forEach(item => {
      const section = result.sections.find(
        section => section.id === item.headerId
      );
      const existingCard = section.cards.find(card => card.id === item.cardId);
      if (!existingCard) {
        // find index to insert card
        let index = section.cards.findIndex(
          card => item.cardOrderIndex < card.orderIndex
        );
        if (index < 0) {
          index = section.cards.length;
        }

        section.cards.splice(index, 0, {
          id: item.cardId,
          title: item.cardTitle,
          type: item.cardType,
          orderIndex: item.cardOrderIndex,
          items: []
        });
      }
    });
    // because items don't use orderIndex, there's no way to know which item comes before which item.
    // Had to do nested loop with headers and cards to retrieve items
    // yes it's slow and sucks, but didn't see any other way
    const getItemsInOrderQuery = `
		SELECT itemId, annotation, Items.orderIndex AS itemOrderIndex, indentation, contentText, contentUrl, contentLabel, contentMode, Items.internal, inline, sourceId, Items.approved,
		iconType, Icons.typeKeyword AS iconTypeKeyword, Icons.typeName AS iconTypeName, Icons.groupIndex AS iconGroupIndex, color AS iconColor
		FROM TrainingPageItems
		INNER JOIN Items using (itemId)
		INNER JOIN Icons using (iconType)
		WHERE trainingPageId = ? AND cardId = ?`;

    for (let sectIdx = 0; sectIdx < result.sections.length; sectIdx++) {
      const section = result.sections[sectIdx];
      for (let cardIdx = 0; cardIdx < section.cards.length; cardIdx++) {
        const card = section.cards[cardIdx];
        const [items] = await pool.query(getItemsInOrderQuery, [pageId, card.id]);
        card.items = items;
      }
    }

    return result;
  } catch (err) {
    console.error("ERRRR: ", err);
    return {error: err};
  }
}
module.exports.getTrainingPage = getTrainingPage;

module.exports.getTrainingPagesFromSourcePage = async function (sourcePageId) {
  const query = `SELECT id, name, description, viewers FROM TrainingPages WHERE sourcePageId = ?`;
  const [results] = await pool.query(query, [sourcePageId]);
  return results;
};


module.exports.deleteTrainingPage = async function (pageId) {
  const query = `DELETE FROM TrainingPages WHERE id = ?`;
  const [results] = await pool.query(query, [pageId]);
  return results;
};
