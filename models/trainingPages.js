const {pool} = require("../services/database/mysqlPool");

async function createTrainingPage(itemList, name) {
  // insert name to TrainingPages table in database
  const insertPageQuery = `INSERT INTO TrainingPages (name) VALUES (?)`;
  const insertPageItemsQuery = `INSERT INTO TrainingPageItems (trainingPageId, itemId, annotation) VALUES (?, ?, ?)`;
  const removePageQuery = `DELETE from TrainingPages WHERE name=?`;
  let insertResult;

  try {
    // remove existing entries from both tables before insert
    await pool.query(removePageQuery, [name]);

    insertResult = await pool.query(insertPageQuery, [name]);
    const pageId = insertResult[0].insertId;

    // traverse the itemList and build the query array
    const queryList = itemList.map(item => pool.query(insertPageItemsQuery, [pageId, item.id, item.annotation]));
    await Promise.all(queryList);
  } catch (err) {
    return {error: err};
  }
  return insertResult[0];
}
module.exports.createTrainingPage = createTrainingPage;


async function getTrainingPage(pageId) {
  const result = {pageId: pageId};
  const getPageInfoQuery = `SELECT * FROM TrainingPages WHERE id = ?`;
  const getItemList = `
		SELECT 
			itemId, annotation, Items.orderIndex AS itemOrderIndex, indentation, contentText, contentUrl, contentLabel, contentMode, Items.internal, inline, sourceId, Items.approved, 
			cardId, cardType, Cards.orderIndex AS cardOrderIndex, Cards.title AS cardTitle, 
			iconType, Icons.typeKeyword AS iconTypeKeyword, Icons.typeName AS iconTypeName, Icons.groupIndex AS iconGroupIndex, color AS iconColor, 
			headerId, pageId AS originalPageId, Headers.orderIndex AS headerOrderIndex, Headers.title AS headerTitle   
		FROM TrainingPageItems 
		INNER JOIN Items using (itemId)
		INNER JOIN Cards using (cardId)
		INNER JOIN Icons using (iconType)
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
    const [itemList] = await pool.query(getItemList, [pageId]);

    result.sections = [];
    // add distinct headers with empty cards into result
    itemList.forEach(item => {
      const existingSection = result.sections.find(section => section.sectionId === item.headerId);
      if (!existingSection) {
        result.sections.push({
          sectionId: item.headerId,
          sectionTitle: item.headerTitle,
          sectionOrderIndex: item.headerOrderIndex,
          sectionCards: []
        });
      }
    });
    // add distinct cards into appropriate headers
    itemList.forEach(item => {
      const section = result.sections.find(section => section.sectionId === item.headerId);
      const existingCard = section.sectionCards.find(card => card.cardId === item.cardId);
      if (!existingCard) {
        // find index to insert card
        let index = section.sectionCards.findIndex(card => item.cardOrderIndex < card.cardOrderIndex);
        if (index < 0) {
          index = section.sectionCards.length;
        }

        // console.log(`\nsectionId: ${section.sectionId}, cardOrder: ${item.cardOrderIndex}, index: ${index}`);
        section.sectionCards.splice(index, 0, {cardId: item.cardId,
          cardTitle: item.cardTitle,
          cardType: item.cardType,
          cardOrderIndex: item.cardOrderIndex,
          cardItems: []
        });
      }
    });

    // insert items into appropriate sections
    itemList.forEach(item => {
      // find section
      const section = result.sections.find(section => section.sectionId === item.headerId);

      // find the card and get its cardItems
      const cardItems = section.sectionCards.find(card => card.cardId === item.cardId).cardItems;
      // find index and insert
      let index = cardItems.findIndex(cardItem => item.itemOrderIndex < cardItem.itemOrderIndex);
      if (index < 0) {
        index = cardItems.length;
      }
      cardItems.splice(index, 0, {
        itemId: item.itemId,
        annotation: item.annotation,
        itemOrderIndex: item.itemOrderIndex,
        indentation: item.indentation,
        contentText: item.contentText,
        contentUrl: item.contentUrl,
        contentLabel: item.contentLabel,
        inline: item.inline,
        sourceId: item.sourceId,
        iconType: item.iconType,
        iconTypeKeyword: item.iconTypeKeyword,
        iconTypeName: item.iconTypeName,
        iconGroupIndex: item.iconGroupIndex,
        iconColor: item.iconColor
      });
    });

    return result;
  } catch (err) {
    console.log("ERRRR");
    return {error: err};
  }
}


module.exports.getTrainingPage = getTrainingPage;


