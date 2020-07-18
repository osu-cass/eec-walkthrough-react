// File: categories.js
// Description: handles routing for categories

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {formatAlphanumeric} = require("../services/format/formatAlphanumeric");
const {
  roleCheck,
  getUserID,
  requireAuth
} = require("../services/authentication/cookieAuth");
const {
  getCategoryVal,
  postCategoryVal
} = require("../services/validation/requestValidation");
const {
  getCategory,
  getCategories,
  getCategoryNames,
  createCategory
} = require("../models/categories");


// get information about all categories
app.get("/all", getUserID, async (req, res) => {

  try {

    console.log("Get a list of all categories");

    // check if the current user should see all or only some of the categories
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // get a list of all categories with their pages
    const results = await getCategories(viewAll);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get all of the categories names
app.get("/names", requireAuth, async (req, res) => {

  try {

    console.log("Get a list of all category names");

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get a list of all category names."});
      return;
    }

    // get a list of all category names
    const results = await getCategoryNames();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about a single category
app.get("/:categoryId", getUserID, getCategoryVal.validation, async (req, res) => {

  try {

    const categoryId = req.params.categoryId;
    console.log("Get category", categoryId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // check if the current user should be able to view this content
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // get category data
    const results = await getCategory(categoryId, viewAll);

    if (results.categoryId === 0) {
      res.status(404).send({error: "Category not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a category
app.post("/", requireAuth, postCategoryVal.validation, async (req, res) => {

  try {

    console.log("Create a new category");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const singleName = formatAlphanumeric(req.body.singleName).trim();
    const pluralName = formatAlphanumeric(req.body.pluralName).trim();
    const description = req.body.description.trim();
    const internal = req.body.internal;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create page."});
      return;
    }

    // create a category
    const results = await createCategory(singleName, pluralName, description, userId, internal);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Category already exists."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
