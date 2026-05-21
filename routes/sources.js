// File: sources.js
// Description: handles routing for sources

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getSources,
  createSources,
  createSingleSource
} = require("../models/sources");
const {
  getSourcesVal,
  postSourceVal,
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


// edit the sources for a specific page
app.post("/all/page/:pageId", requireAuth, postSourcesVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const sources = req.body.sources;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create source data."});
      return;
    }

    // create the sources
    const results = await createSources(pageId, sources);

    if (results.sourcesApproved >= 0) {
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


// add a single source to a specific page
app.post("/page/:pageId", requireAuth, postSourceVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const text = req.body.text;

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

    // create the source
    const results = await createSingleSource(pageId, text);

    if (results.insertId) {
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
