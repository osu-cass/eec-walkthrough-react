const { pool } = require("../services/database/mysqlPool")

async function createTrainingPage(itemList, name) {
	// insert name to TrainingPages table in database
	const insertPageQuery = `INSERT INTO TrainingPages (name) VALUES (?)`
	const insertPageItemsQuery = `INSERT INTO TrainingPageItems (trainingPageId, itemId, annotation) VALUES (?, ?, ?)`
	const removePageQuery = `DELETE from TrainingPages WHERE name=?`
	let insertResult

	try {
		// remove existing entries from both tables before insert
		await pool.query(removePageQuery, [name])

		insertResult = await pool.query(insertPageQuery, [name])
		const pageId = insertResult[0].insertId

		// traverse the itemList and insert each entry to junction table
		console.log('begin promise all')
		Promise.all(
			itemList.map(async item => {
				await pool.query(insertPageItemsQuery, [pageId, item.id, item.annotation])
			})
		)
	}
	catch (err) {
		return { error: err }
	}
	return insertResult[0]
}
module.exports.createTrainingPage = createTrainingPage

