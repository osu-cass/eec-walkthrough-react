// File: views.js
// Description: handles routing views

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getUserID
} = require("../services/authentication/cookieAuth");
// const {
//   postViewVal
// } = require("../services/validation/requestValidation");
const {
  getViews
} = require("../models/views");

// get information about all of the views for a given page
app.get("/page/:pageId", getUserID, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;
    console.log("Get all views for page", pageId);

    // get user data
    const results = await getViews(pageId, userId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});

module.exports = app;
