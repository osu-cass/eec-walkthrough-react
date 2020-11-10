// File: requests.js
// Description: handles routing for requests

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getRequests,
  getRequest,
  getSelection,
  createRequest,
  createComment,
  deleteComment,
  updateComment,
  deleteRequest,
  approveRequest
} = require("../models/requests");
const {
  getRequestVal,
  getRequestStatusVal,
  getSelectionVal,
  postRequestVal,
  postCommentVal,
  patchCommentVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get information about all requests that match a status
app.post("/status/:status", getRequestStatusVal.validation, requireAuth, async (req, res) => {

  try {

    console.log("Get a list of requests");

    const status = req.params.status;
    const sort = req.body.sort;
    const order = req.body.order;
    const cursor = {
      primary: req.body.cursorPrimary,
      secondary: req.body.cursorSecondary
    };

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
    const results = await getRequests(parseInt(status, 10), parseInt(sort, 10), parseInt(order, 10), cursor);
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
    const userId = req.auth.userId;
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
    const results = await getRequest(requestId, userId);

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
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create a publish request."});
      return;
    }

    // create the request
    const results = await createRequest(title, description, objects, userId);

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


// submit a request comment
app.post("/comment/:requestId", requireAuth, postCommentVal.validation, async (req, res) => {

  try {

    console.log("Create a request comment");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const requestId = req.params.requestId;
    const comment = req.body.comment;
    const status = req.body.status;
    const targetId = req.body.targetId;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create a request comment."});
      return;
    }

    // create the comment
    const results = await createComment(requestId, comment, parseInt(status, 10), targetId, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Request not found."});
      } else if (results.error === 2) {
          res.status(403).send({error: "This request is not accepting orange reviews."});
      } else if (results.error === 3) {
        res.status(403).send({error: "This request is not accepting black reviews."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a request comment
app.delete("/comment/:commentId", requireAuth, async (req, res) => {

  try {

    const commentId = req.params.commentId;
    const userId = req.auth.userId;
    console.log("Delete request comment", commentId);

    // delete the comment if the user is the owner
    const results = await deleteComment(commentId, userId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Comment not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Reviews are not allowed to be deleted, as the request status has already been updated."});
      } else if (results.error === 3) {
        res.status(403).send({error: "The request is not open, so the comment cannot be deleted."});
      } else if (results.error === 4) {
        res.status(401).send({error: "Unauthorized user attempting to delete comment."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update a request comment
app.patch("/comment/:commentId", requireAuth, patchCommentVal.validation, async (req, res) => {

  try {

    console.log("Update a comment");

    const commentId = req.params.commentId;
    const commentText = req.body.commentText;
    const userId = req.auth.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // update a comment if the user is the owner
    const results = await updateComment(commentId, commentText, userId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Comment not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "The request is not open, so the comment cannot be edited."});
      } else if (results.error === 3) {
        res.status(401).send({error: "Unauthorized user attempting to edit comment."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a request
app.delete("/:requestId", requireAuth, async (req, res) => {

  try {

    const requestId = req.params.requestId;
    const userId = req.auth.userId;
    let admin = false;
    console.log("Delete request", requestId);

    // make sure the user is allowed to perform this action
    if (await roleCheck(5, req.auth.userId)) {
      admin = true;
    }

    // delete the request data
    const results = await deleteRequest(requestId, userId, admin);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Request not found."});
      } else if (results.error === 2) {
        res.status(401).send({error: "Unauthorized user attempting to close request."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// accept a publish request
app.post("/accept/:requestId", requireAuth, async (req, res) => {

  try {

    const requestId = req.params.requestId;
    console.log("Accept request", requestId);

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to approve a request."});
      return;
    }

    // approve a request
    const results = await approveRequest(requestId);

    if (results.objectsApproved >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Request not found."});
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
