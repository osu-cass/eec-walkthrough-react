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


async function getTrainingPage(pageId) {
	const getTrainingPageQuery = `SELECT * FROM TrainingPages `
}


module.exports.createTrainingPage = createTrainingPage;

