// File: quizzes.js
// Description: handles routing for quizzes

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  getUserID,
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");
const {
  getPageVal,
  postQuizResultsVal,
  postQuizVal,
  postObservationVal
} = require("../services/validation/requestValidation");
const {
  getPageQuiz,
  getQuizResults,
  submitQuiz,
  submitObservations,
  createQuiz,
  getObservations
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


// gets the quiz scores for the current user for a specific page
app.get("/:pageId/scores", getUserID, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;
    console.log("Get quiz results related to page", pageId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // get quiz page data
    const results = await getQuizResults(pageId, userId);

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


// submit quiz results
app.post("/:pageId/scores", requireAuth, postQuizResultsVal.validation, async (req, res) => {

  try {

    console.log("Submit quiz results");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const userId = req.auth.userId;
    const pageId = req.params.pageId;
    const scores = req.body.scores;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(1, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to submit quiz results."});
      return;
    }

    // create a card
    const results = await submitQuiz(userId, scores, pageId);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(422).send({error: "Invalid format for scores."});
      } else if (results.error === 2) {
        res.status(404).send({error: "Question not found."});
      } else if (results.error === 3) {
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


// create quiz questions
app.post("/:pageId", requireAuth, postQuizVal.validation, async (req, res) => {

  try {

    console.log("Submit quiz questions");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const pageId = req.params.pageId;
    const questions = req.body.questions;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to submit quiz questions."});
      return;
    }

    // create a quiz
    const results = await createQuiz(questions, pageId);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(422).send({error: "Invalid format for questions."});
      } else if (results.error === 2) {
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


// gets the observations made by users who took a quiz
app.get("/observations", requireAuth, async (req, res) => {

  try {

    // const userId = req.auth.userId;
    console.log("Get all observations");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to view observations."});
      return;
    }

    // get quiz observation data
    const results = await getObservations();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// submit quiz observations
app.post("/:pageId/observations", requireAuth, postObservationVal.validation, async (req, res) => {

  try {

    console.log("Submit observation(s)");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const userId = req.auth.userId;
    const pageId = req.params.pageId;
    const observations = req.body.observations;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(1, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to submit an observation."});
      return;
    }

    // save user observations
    const results = await submitObservations(userId, pageId, observations);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(422).send({error: "Invalid format for observations."});
      } else if (results.error === 2) {
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
