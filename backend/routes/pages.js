// File: pages.js
// Description: handles routing for pages

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {roleCheck} = require("../services/authentication/cookieAuth");
const {requireAuth} = require("../services/authentication/cookieAuth");
const {
  postPageVal,
  getPageVal,
  patchPageVal,
  industrySubjectVal,
  searchPageVal
} = require("../services/validation/requestValidation");
const {
  getPage,
  getPages,
  getFullPage,
  searchPages,
  createPage,
  deletePage,
  updatePage,
  addSubject,
  deleteSubject
} = require("../models/pages");


// get information about all pages and their related subjects/industries
app.get("/all", async (req, res) => {

  try {

    console.log("Get a list of all pages and their related subjects/industries");

    // get a list of all pages and their related subjects/industries
    const results = await getPages();

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
app.get("/:pageId", getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

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
app.get("/:pageId/all", getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get all data related to page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

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


// get a list of pages based on a search query
app.get("/search/:text/:cursorPrimary/:cursorSecondary", searchPageVal.validation, async (req, res) => {

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

    // search for pages
    const results = await searchPages(text, cursor);

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
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create page."});
    }

    // create a page
    const results = await createPage(pageType, name, title, description, imageUrl, userId);

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

    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete page."});
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


// update a page
app.patch("/:pageId", requireAuth, patchPageVal.validation, async (req, res) => {

  try {

    console.log("Update a page");

    const pageId = req.params.pageId;
    const pageType = req.body.pageType;
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const approved = req.body.approved;
    const userId = req.auth.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update page."});
    }

    // update a page
    const results = await updatePage(pageId, pageType, name, title, description, imageUrl, approved);

    if (results.changedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Page not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Page name and type combination already exists."});
      } else if (results.error === 3) {
        res.status(422).send({error: "Request doesn't include any fields to update."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// assign a subject to an industry
app.post("/industries/:industryId/subjects/:subjectId", requireAuth, industrySubjectVal.validation, async (req, res) => {

  try {

    const industryId = req.params.industryId;
    const subjectId = req.params.subjectId;
    const userId = req.auth.userId;
    console.log("Add subject", subjectId, "to industry", industryId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, userId)) {
      res.status(401).send({error: "Unauthorized user attempting to add subject to industry."});
    }

    // add the subject to the industry
    const results = await addSubject(subjectId, industryId);

    if (results.subjectId && results.industryId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Subject page not found."});
      } else if (results.error === 2) {
        res.status(404).send({error: "Industry page not found."});
      } else if (results.error === 3) {
        res.status(403).send({error: "This subject is already part of this industry."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// remove a subject from an industry
app.delete("/industries/:industryId/subjects/:subjectId", requireAuth, industrySubjectVal.validation, async (req, res) => {

  try {

    const industryId = req.params.industryId;
    const subjectId = req.params.subjectId;
    const userId = req.auth.userId;
    console.log("Remove subject", subjectId, "from industry", industryId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, userId)) {
      res.status(401).send({error: "Unauthorized user attempting to remove subject from industry."});
    }

    // remove the subject from the industry
    const results = await deleteSubject(subjectId, industryId);

    if (results.affectedRows) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Subject page not found."});
      } else if (results.error === 2) {
        res.status(404).send({error: "Industry page not found."});
      } else if (results.error === 3) {
        res.status(404).send({error: "This subject is not part of this industry."});
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
