// File: pages.js
// Description: handles routing for pages

const express = require("express");
const {validationResult} = require("express-validator");
const {postPage} = require("../services/validation/requestValidation");
const app = express();
const {
  getPage,
  getPages,
  getFullPage,
  createPage
} = require("../models/pages");


// get information about all pages and their related subjects/industries
app.get("/all", async (req, res) => {

  try {

    console.log("Get a list of all pages and their related subjects/industries");

    // get a list of all pages and their related subjects/industries
    const results = await getPages();
    console.log(results);
    if (results.pages.subjects.length === 0 && results.pages.industries.length === 0) {
      res.status(404).send({error: "No pages found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about a single page
app.get("/:pageId", async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get page", pageId);

    // get page data
    const results = await getPage(pageId);

    if (results.pageId === 0) {
      res.status(404).send({error: "Page not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get all of the page info, headers, cards, and items for a single page
app.get("/:pageId/all", async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get all data related to page", pageId);

    // get complete page data
    const results = await getFullPage(pageId);

    if (results.pageId === 0) {
      res.status(404).send({error: "Page not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a page
app.post("/", postPage.validation, async (req, res) => {

  try {

    // confirm that the request body has a valid page
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const pageType = req.body.pageType;
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const userId = req.body.userId;
    console.log("Create a new page");

    // create a page
    const results = await createPage(pageType, name, title, description, imageUrl, userId);

    if (results.insertId) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Unauthorized user attempting to create page."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Page already exists."});
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
