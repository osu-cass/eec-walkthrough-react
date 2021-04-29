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
		WHERE trainingPageId =  ?`;
  try {
    const [[pageInfo]] = await pool.query(getPageInfoQuery, [pageId]);
    console.log(pageInfo);
    if (!pageInfo) {
      return {
        error: "Invalid training page ID"
      };
    }

    result.pageName = pageInfo.name;
    const [itemList] = await pool.query(getItemList, [pageId]);
    result.itemList = itemList;
    return result;
  } catch (err) {
    return {error: err};
  }
}


module.exports.getTrainingPage = getTrainingPage;


