// File: categories.js
// Description: handles routing for categories

const express = require("express")
const app = express()
const { validationResult } = require("express-validator")
const { formatAlphanumeric } = require("../services/format/formatAlphanumeric")
const {
	roleCheck,
	getUserID,
	requireAuth
} = require("../services/authentication/cookieAuth")
const {
	getCategoryVal,
	postCategoryVal,
	patchCategoryVal
} = require("../services/validation/requestValidation")
const {
	getCategory,
	getCategories,
	getCategoryNames,
	getCategoryPublished,
	createCategory,
	updateCategory,
	deleteCategory
} = require("../models/categories")


// get information about all categories
app.get("/all", getUserID, async (req, res) => {

	try {

		console.log("Get a list of all categories")

		const userId = req.auth.userId

		// get a list of all categories with their pages
		const results = await getCategories(userId)
		res.status(200).send(results)

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// get all of the categories names
app.get("/names", getUserID, async (req, res) => {

	try {

		console.log("Get a list of all category names")

		const userId = parseInt(req.auth.userId, 10)

		// get a list of all category names
		const results = await getCategoryNames(userId)
		res.status(200).send(results)

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// get all of the categories information for categories with at least one published page
app.get("/published", getUserID, async (req, res) => {

	try {

		console.log("Get a list of all category names for published content")

		const userId = parseInt(req.auth.userId, 10)

		// get a list of all category names
		const results = await getCategoryPublished(userId)
		res.status(200).send(results)

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// get information about a single category
app.get("/:categoryId", getUserID, getCategoryVal.validation, async (req, res) => {

	try {

		const categoryId = req.params.categoryId
		const userId = req.auth.userId
		console.log("Get category", categoryId)

		// confirm that the request is valid
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.error(errors.array())
			return res.status(422).json({ errors: errors.array() })
		}

		// get category data
		const results = await getCategory(categoryId, userId)

		if (results.categoryId) {
			res.status(200).send(results)
		} else {

			if (results.error === 1) {
				res.status(404).send({ error: "Category not found." })
			} else {
				res.status(500).send({ error: "An internal server error occurred. Please try again later." })
			}

		}

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// create a category
app.post("/", requireAuth, postCategoryVal.validation, async (req, res) => {

	try {

		console.log("Create a new category")

		// confirm that the request is valid
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.error(errors.array())
			return res.status(422).json({ errors: errors.array() })
		}

		const singleName = formatAlphanumeric(req.body.singleName).trim()
		const pluralName = formatAlphanumeric(req.body.pluralName).trim()
		const description = req.body.description.trim()
		const internal = req.body.internal
		const userId = req.auth.userId

		// make sure the user is allowed to perform this action
		if (!await roleCheck(5, req.auth.userId)) {
			res.status(401).send({ error: "Unauthorized user attempting to create page." })
			return
		}

		// create a category
		const results = await createCategory(singleName, pluralName, description, userId, internal)

		if (results.insertId) {
			res.status(201).send(results)
		} else {

			if (results.error === 1) {
				res.status(403).send({ error: "Category already exists." })
			} else {
				res.status(500).send({ error: "An internal server error occurred. Please try again later." })
			}

		}

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// update a category
app.patch("/:categoryId", requireAuth, patchCategoryVal.validation, async (req, res) => {

	try {

		console.log("Update a category")

		const categoryId = req.params.categoryId
		const singleName = formatAlphanumeric(req.body.singleName).trim()
		const pluralName = formatAlphanumeric(req.body.pluralName).trim()
		const description = req.body.description.trim()
		const internal = req.body.internal
		const userId = req.auth.userId

		// confirm that the request is valid
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.error(errors.array())
			return res.status(422).json({ errors: errors.array() })
		}

		// make sure the user is allowed to perform this action
		if (!await roleCheck(5, req.auth.userId)) {
			res.status(401).send({ error: "Unauthorized user attempting to update category." })
			return
		}

		// update a category
		const results = await updateCategory(categoryId, singleName, pluralName, description, userId, internal)

		if (results.categoryId >= 0) {
			res.status(200).send(results)
		} else {

			if (results.error === 1) {
				res.status(404).send({ error: "Category not found." })
			} else {
				res.status(500).send({ error: "An internal server error occurred. Please try again later." })
			}

		}

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


// delete a header
app.delete("/:categoryId", requireAuth, getCategoryVal.validation, async (req, res) => {

	try {

		const categoryId = req.params.categoryId
		console.log("Delete category", categoryId)

		// confirm that the request is valid
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.error(errors.array())
			return res.status(422).json({ errors: errors.array() })
		}

		// make sure the user is allowed to perform this action
		if (!await roleCheck(5, req.auth.userId)) {
			res.status(401).send({ error: "Unauthorized user attempting to delete category." })
			return
		}

		// delete the header data
		const results = await deleteCategory(categoryId)

		if (results.affectedRows >= 0) {
			res.status(200).send(results)
		} else {

			if (results.error === 1) {
				res.status(404).send({ error: "Category not found." })
			} else if (results.error === 2) {
				res.status(403).send({ error: "The category must have zero pages before it can be deleted." })
			} else {
				res.status(500).send({ error: "An internal server error occurred. Please try again later." })
			}

		}

	} catch (err) {
		console.error(err)
		res.status(500).send({ error: "An internal server error occurred. Please try again later." })
	}

})


module.exports = app
