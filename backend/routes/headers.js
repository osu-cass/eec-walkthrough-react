// File: headers.js
// Description: handles routing for headers

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth
} = require("../services/authentication/cookieAuth");
const {
  postHeaderVal,
  getHeaderVal,
  patchHeaderVal
} = require("../services/validation/requestValidation");

const {
  getHeader,
  createHeader,
  deleteHeader,
  updateHeader
} = require("../models/headers");


// get information about a single header
app.get("/:headerId", getHeaderVal.validation, async (req, res) => {

  try {

    const headerId = req.params.headerId;
    console.log("Get header", headerId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // get header data
    const results = await getHeader(headerId);

    if (results.headerId === 0) {
      res.status(404).send({error: "Header not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a header
app.post("/", requireAuth, postHeaderVal.validation, async (req, res) => {

  try {

    console.log("Create a new header");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const pageId = req.body.pageId;
    const orderIndex = req.body.orderIndex;
    const title = req.body.title;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create header."});
      return;
    }

    // create a header
    const results = await createHeader(pageId, orderIndex, title, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Header already exists."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Parent page does not exist."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a header
app.delete("/:headerId", requireAuth, getHeaderVal.validation, async (req, res) => {

  try {

    const headerId = req.params.headerId;
    console.log("Delete header", headerId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete header."});
      return;
    }

    // delete the header data
    const results = await deleteHeader(headerId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Header not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update a header
app.patch("/:headerId", requireAuth, patchHeaderVal.validation, async (req, res) => {

  try {

    console.log("Update a header");

    const headerId = req.params.headerId;
    const pageId = req.body.pageId;
    const orderIndex = req.body.orderIndex;
    const title = req.body.title;
    const approved = req.body.approved;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update header."});
      return;
    }

    // update a header
    const results = await updateHeader(headerId, pageId, orderIndex, title, approved);

    if (results.changedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Header not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Selected parent page does not exist."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Selected parent page already has a header with the selected title."});
      } else if (results.error === 4) {
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


module.exports = app;
