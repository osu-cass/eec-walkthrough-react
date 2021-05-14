const {pool} = require("../services/database/mysqlPool");

async function createTrainingPage(itemList, name, description, sourcePageId, category) {
  // insert name to TrainingPages table in database
  const insertPageQuery = `INSERT INTO TrainingPages (name, description, category, sourcePageId) VALUES (?, ?, ?, ?)`;
  const insertPageItemsQuery = `INSERT INTO TrainingPageItems (trainingPageId, itemId, annotation) VALUES (?, ?, ?)`;
  const removePageQuery = `DELETE from TrainingPages WHERE name=?`;
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  let insertResult;

  try {
    // remove existing entries from both tables before insert
    await pool.query(removePageQuery, [name]);

    insertResult = await pool.query(insertPageQuery, [name, description, capitalizedCategory, sourcePageId]);
    const pageId = insertResult[0].insertId;

    // traverse the itemList and build the query array
    const queryList = itemList.map(item =>
      pool.query(insertPageItemsQuery, [pageId, item.id, item.annotation])
    );
    await Promise.all(queryList);
  } catch (err) {
    return {error: err};
  }
  return insertResult[0];
}
module.exports.createTrainingPage = createTrainingPage;

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
