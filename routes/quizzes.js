// File: quizzes.js
// Description: handles routing for quizzes

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  getPageVal
} = require("../services/validation/requestValidation");
const {
  getPageQuiz,
} = require("../models/quizzes");


// gets the title and the quiz data for the specified page
app.get("/:pageId", getUserID, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;
    console.log("Get all quiz data related to page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // get quiz page data
    const results = await getPageQuiz(pageId, userId);

    if (results.error) {
      res.status(404).send({error: "Page not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
