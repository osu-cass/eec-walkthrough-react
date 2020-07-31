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
  searchPages,
  createPage,
  deletePage,
  deletePageChanges,
  updatePage,
  publishPage,
  unpublishPage
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
      return res.status(422).json({errors: errors.array()});
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


module.exports = app;
