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
  patchHeaderVal,
  patchHeaderMove
} = require("../services/validation/requestValidation");
const {
  createHeader,
  deleteHeader,
  deleteHeaderChanges,
  updateHeader,
  publishHeader,
  unpublishHeader,
  moveHeader,
  moveTempHeader
} = require("../models/headers");


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
    const title = req.body.title.trim();
    const internal = req.body.internal;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create header."});
      return;
    }

    // create a header
    const results = await createHeader(pageId, title, userId, internal);

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
    if (!await roleCheck(4, req.auth.userId)) {
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


// delete a header edit
app.delete("/:headerId/changes", requireAuth, getHeaderVal.validation, async (req, res) => {

  try {

    const headerId = req.params.headerId;
    console.log("Delete header changes", headerId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete header changes."});
      return;
    }

    // delete the header changes
    const results = await deleteHeaderChanges(headerId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "No unpublished version of this header found."});
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
    const title = req.body.title.trim();
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
      res.status(401).send({error: "Unauthorized user attempting to update header."});
      return;
    }

    // update a header
    const results = await updateHeader(headerId, title, userId, internal);

    if (results.headerId >= 0) {
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


// publish a header
app.post("/:headerId/publish", requireAuth, getHeaderVal.validation, async (req, res) => {

  try {

    console.log("Publish a header");

    const headerId = req.params.headerId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to publish a header."});
      return;
    }

    // publish a header
    const results = await publishHeader(headerId);

    if (results.headerId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Header not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "A header with this name already exists on this page."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// unpublish a header
app.post("/:headerId/unpublish", requireAuth, getHeaderVal.validation, async (req, res) => {

  try {

    console.log("Unpublish a header");

    const headerId = req.params.headerId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to unpublish a header."});
      return;
    }

    // unpublish a header
    const results = await unpublishHeader(headerId);

    if (results.headerId >= 0) {
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


// move a header relative to other headers
app.patch("/:headerId/move/:direction/:mode", requireAuth, patchHeaderMove.validation, async (req, res) => {

  try {

    const headerId = req.params.headerId;
    const direction = req.params.direction;
    const mode = req.params.mode;

    if (parseInt(direction, 10)) {
      console.log("Move header", headerId, "up");
    } else {
      console.log("Move header", headerId, "down");
    }

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (parseInt(mode, 10)) {
      if (!await roleCheck(4, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move header."});
        return;
      }
    } else {
      if (!await roleCheck(3, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move header."});
        return;
      }
    }

    // update a header
    let results;
    if (parseInt(mode, 10)) {
      results = await moveHeader(headerId, parseInt(direction, 10));
    } else {
      results = await moveTempHeader(headerId, parseInt(direction, 10));
    }

    if (results.headerId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Header not found."});
      } else if (results.error === 2) {
        if (parseInt(direction, 10)) {
          res.status(403).send({error: "No header exists above this header"});
        } else {
          res.status(403).send({error: "No header exists below this header"});
        }
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