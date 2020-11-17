// File: contributors.js
// Description: handles routing for contributors

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getContributors,
  getContributorRequests
} = require("../models/contributors");
const {
  patchInfoVal
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

/*
// update an info object
app.patch("/:infoId", requireAuth, patchInfoVal.validation, async (req, res) => {

  try {

    console.log("Update an info object");

    const infoId = req.params.infoId;
    const title = req.body.title;
    const text = req.body.text;
    const icon = req.body.icon;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update info."});
      return;
    }

    // update info
    const results = await updateInfo(infoId, title, text, icon);

    if (results.infoId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Info not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});
*/

module.exports = app;