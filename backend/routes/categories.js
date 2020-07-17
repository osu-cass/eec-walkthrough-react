// File: categories.js
// Description: handles routing for categories

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  getCategoryVal
} = require("../services/validation/requestValidation");
const {
  getCategory,
  getCategories,
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


module.exports = app;
