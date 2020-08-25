// File: sources.js
// Description: handles routing for sources

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getSources,
  createSources
} = require("../models/sources");
const {
  getSourcesVal,
  postSourcesVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get all sources on a given page
app.get("/page/:pageId", requireAuth, getSourcesVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get all sources on page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get source data."});
      return;
    }

    // get sources
    const results = await getSources(pageId);

    if (results.sources) {
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


// create a list of citations
app.post("/page/:pageId", requireAuth, postSourcesVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const sources = req.body.sources;
    console.log("Post sources for page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create source data."});
      return;
    }

    // create the sources
    const results = await createSources(pageId, sources);

    if (results.insertId) {
      res.status(201).send(results);
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
