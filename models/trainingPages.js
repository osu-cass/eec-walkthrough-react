const { pool } = require("../services/database/mysqlPool")

async function createTrainingPage(itemIds, name) {
	// insert name to TrainingPages table in database
	const insertPathQuery = `INSERT INTO TrainingPages (name) VALUES (?)`
	let result
	try {
		result = pool.query(insertPathQuery, [name])
	}
	catch (err) {
		throw err
	}
	console.log(result)
}

module.exports.createTrainingPage = createTrainingPage