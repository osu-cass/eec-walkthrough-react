// File: contributors.js
// Description: handles routing for contributors

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getContributors,
  getPendingContributors,
  getContributorRequests,
  createContributor,
  createContributorSubmission,
  rejectContributorSubmission,
  acceptContributorSubmission
} = require("../models/contributors");
const {
  postContributorVal,
  postContributorSubmissionVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get all contributors
app.get("/", async (req, res) => {

  try {
    console.log("View contributors");

    // get all contributors
    const results = await getContributors();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get all pending contributors
app.get("/pending", async (req, res) => {

  try {
    console.log("View pending contributors");

    // get all contributors
    const results = await getPendingContributors();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get contributors with a list of the publish requests that they have made
app.get("/requests", requireAuth, async (req, res) => {

  try {
    console.log("View contributor requests");

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to view contributor requests."});
      return;
    }

    // get all contributors
    const results = await getContributorRequests();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// post a contributor submission that will need to be reviewed
app.post("/submission", requireAuth, postContributorSubmissionVal.validation, async (req, res) => {

  try {

    console.log("Post a contributor submission");

    const userId = req.auth.userId;
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to post a contributor submission."});
      return;
    }

    // post contributor submission
    const results = await createContributorSubmission(userId, name, title, description, imageUrl);

    if (results.contributorId >= 0) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// post contributor data
app.post("/:userId", requireAuth, postContributorVal.validation, async (req, res) => {

  try {

    console.log("Post a contributor");

    const userId = req.params.userId;
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const active = req.body.active;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to post a contributor."});
      return;
    }

    // post contributor
    const results = await createContributor(userId, name, title, description, imageUrl, active);

    if (results.contributorId >= 0) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// reject a pending contributor submission request
app.delete("/pending/:contributorId", requireAuth, async (req, res) => {

  try {

    console.log("Reject a contributor submission");

    const contributorId = req.params.contributorId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to reject a contributor submission."});
      return;
    }

    // reject the contributor submission
    const results = await rejectContributorSubmission(contributorId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {
      if (results.error === 1) {
        res.status(404).send({error: "Submission not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// accept a pending contributor submission request
app.patch("/pending/:contributorId", requireAuth, async (req, res) => {

  try {

    console.log("Accept a contributor submission");

    const contributorId = req.params.contributorId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to accept a contributor submission."});
      return;
    }

    // accept the contributor submission
    const results = await acceptContributorSubmission(contributorId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {
      if (results.error === 1) {
        res.status(404).send({error: "Submission not found."});
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