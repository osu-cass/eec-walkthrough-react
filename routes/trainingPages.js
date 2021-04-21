const express = require("express")
const app = express.Router()

const { createTrainingPage } = require('../models/trainingPages')

app.post('/', async (req, res) => {
	// create new entry in TrainingPages in database

	const itemIds = req.body.ids
	const name = req.body.name
	// validate ids and name

	const response = await createTrainingPage(itemIds, name)
	// if no error, response 201
	res.status(201).json({
		message: 'OK'
	})
})

module.exports = app