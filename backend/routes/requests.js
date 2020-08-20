// File: requests.js
// Description: handles routing for requests

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getRequests,
  getRequest,
  getSelection,
  createRequest
} = require("../models/requests");
const {
  getRequestVal,
  getSelectionVal,
  postRequestVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get information about all requests
app.get("/all", requireAuth, async (req, res) => {

  try {

    console.log("Get a list of requests");

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get request data."});
      return;
    }

    // get requests
    const results = await getRequests();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about a specific request
app.get("/:requestId", requireAuth, getRequestVal.validation, async (req, res) => {

  try {

    const requestId = req.params.requestId;
    console.log("Get all data related to request", requestId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get request data."});
      return;
    }

    // get requests
    const results = await getRequest(requestId);

    if (results.requestId === 0) {
      res.status(404).send({error: "Request not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about a group of selected objects
app.post("/selections", requireAuth, getSelectionVal.validation, async (req, res) => {

  try {

    console.log("Get request selection data");

    const objects = req.body.objects;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get request selection data."});
      return;
    }

    // get request selection data
    const results = await getSelection(objects);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// submit a publish request
app.post("/", requireAuth, postRequestVal.validation, async (req, res) => {

  try {

    console.log("Create publish request");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const title = req.body.title;
    const description = req.body.description;
    const objects = req.body.objects;
    const user = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create a publish request."});
      return;
    }

    // create the request
    const results = await createRequest(title, description, objects, user);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "No valid objects submitted."});
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
