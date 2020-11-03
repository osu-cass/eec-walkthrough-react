// File: pages.js
// Description: handles routing for pages

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth,
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  postPageVal,
  getPageVal,
  patchPageVal,
  searchPageVal
} = require("../services/validation/requestValidation");
const {
  getFullPage,
  recentPages,
  searchPages,
  createPage,
  deletePage,
  deletePageChanges,
  updatePage,
  publishPage,
  unpublishPage,
  getReport
} = require("../models/pages");


// get all of the page info, headers, cards, and items for a single page
app.get("/:pageId/all", getUserID, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get all data related to page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // check if the current user should be able to view this content
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // get complete page data
    const results = await getFullPage(pageId, viewAll);

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

// get a list of the most recently updated pages
app.get("/updated", getUserID, async (req, res) => {

  try {

    console.log("Get the most recently updated pages");

    const userId = req.auth.userId;

    // check if the current user should be able to view this content
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // get recent pages
    const results = await recentPages(viewAll);

    if (results.pages.length) {
      res.status(200).send(results);
    } else {
      res.status(404).send({error: "No matching pages found."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

// get a list of pages based on a search query
app.get("/search/:text/:cursorPrimary/:cursorSecondary", getUserID, searchPageVal.validation, async (req, res) => {

  try {

    console.log("Searching for pages");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const text = req.params.text;
    const cursor = {
      primary: req.params.cursorPrimary,
      secondary: req.params.cursorSecondary
    };

    // check if the current user should be able to view this content
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // search for pages
    const results = await searchPages(text, cursor, viewAll);

    if (results.pages.length) {
      res.status(200).send(results);
    } else {
      res.status(404).send({error: "No matching pages found."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a page
app.post("/", requireAuth, postPageVal.validation, async (req, res) => {

  try {

    console.log("Create a new page");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const pageType = req.body.pageType;
    const name = req.body.name.trim();
    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();
    const internal = req.body.internal;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create page."});
      return;
    }

    // create a page
    const results = await createPage(pageType, name, title, description, imageUrl, userId, internal);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
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


// delete a page
app.delete("/:pageId", requireAuth, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Delete page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete page."});
      return;
    }

    // delete the page data
    const results = await deletePage(pageId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Page not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete page changes
app.delete("/:pageId/changes", requireAuth, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Delete page changes", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete page changes."});
      return;
    }

    // delete the page changes
    const results = await deletePageChanges(pageId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "No unpublished version of this page found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update a page
app.patch("/:pageId", requireAuth, patchPageVal.validation, async (req, res) => {

  try {

    console.log("Update a page");

    const pageId = req.params.pageId;
    const pageType = req.body.pageType;
    const name = req.body.name.trim();
    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();
    const internal = req.body.internal;
    const userId = req.auth.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update page."});
      return;
    }

    // update a page
    const results = await updatePage(pageId, pageType, name, title, description, imageUrl, userId, internal);

    if (results.pageId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Page not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// publish a page
app.post("/:pageId/publish", requireAuth, getPageVal.validation, async (req, res) => {

  try {

    console.log("Publish a page");

    const pageId = req.params.pageId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to publish a page."});
      return;
    }

    // publish a page
    const results = await publishPage(pageId);

    if (results.pageId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Page not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "A page with the same name and type already exists."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// unpublish a page
app.post("/:pageId/unpublish", requireAuth, getPageVal.validation, async (req, res) => {

  try {

    console.log("Unpublish a page");

    const pageId = req.params.pageId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to unpublish a page."});
      return;
    }

    // unpublish a page
    const results = await unpublishPage(pageId);

    if (results.pageId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Page not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get a report with all of the published page changes from the start date to the end date
app.get("/report/:start/:end/:offset/:condense", requireAuth, async (req, res) => {

  try {

    const start = req.params.start;
    const end = req.params.end;
    const offset = req.params.offset;
    const condense = req.params.condense;
    console.log("Get a history report (", start, ",", end, ",", "offset: ", offset, ")");

    // confirm that the request is valid
    if (condense !== "0" && condense !== "1") {
      return res.status(422).json({error: "Invalid condense value."});
    }
    const startArray = start.split("-");
    const endArray = end.split("-");
    if (startArray.length !== 3 || endArray.length !== 3) {
      return res.status(422).json({error: "Invalid date range."});
    }
    if (startArray[0].length !== 4 || endArray[0].length !== 4 ||
        startArray[1].length !== 2 || endArray[1].length !== 2 ||
        startArray[2].length !== 2 || endArray[2].length !== 2) {
      return res.status(422).json({error: "Invalid date range."});
    }
    const numbers = /^[0-9]+$/;
    if (!startArray[0].match(numbers) || !startArray[1].match(numbers) || !startArray[2].match(numbers) ||
        !endArray[0].match(numbers) || !endArray[1].match(numbers) || !endArray[2].match(numbers)) {
      return res.status(422).json({error: "Invalid date range"});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(2, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to generate report."});
      return;
    }

    // get complete page data
    const results = await getReport(start, end, parseInt(condense, 10), parseInt(offset, 10));
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
