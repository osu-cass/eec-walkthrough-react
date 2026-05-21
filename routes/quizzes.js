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
  postObservationVal,
  deleteObservationVal,
  updateQuizVal,
  getQuestionVal,
  patchQuestionMoveVal
} = require("../services/validation/requestValidation");
const {
  getPageQuiz,
  getQuizResults,
  submitQuiz,
  submitObservations,
  createQuiz,
  updateQuiz,
  getObservations,
  hideObservation,
  deleteQuestion,
  deleteQuestionChanges,
  publishQuestion,
  unpublishQuestion,
  moveQuestion,
  moveTempQuestion
} = require("../models/quizzes");


// gets the title and the quiz data for the specified page
app.get("/:pageId", getUserID, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // get quiz page data
    const results = await getPageQuiz(pageId, userId, 0);

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


// gets the title and the quiz data for the specified page, including pending changes
app.get("/:pageId/pending", requireAuth, getPageVal.validation, async (req, res) => {

  try {

    const pageId = req.params.pageId;
    const userId = req.auth.userId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(2, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to view pending quiz questions."});
      return;
    }

    // get quiz page data
    const results = await getPageQuiz(pageId, userId, 1);

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

    // create a question
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


// create a quiz question
app.post("/:pageId", requireAuth, postQuizVal.validation, async (req, res) => {

  try {
    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const pageId = req.params.pageId;
    const text = req.body.text;
    const type = req.body.type;
    const imageUrl = req.body.imageUrl;
    const answers = req.body.answers;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create quiz question."});
      return;
    }

    // create a quiz
    const results = await createQuiz(text, type, imageUrl, answers, pageId);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(422).send({error: "Invalid format for answers."});
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


// update a quiz question
app.patch("/:questionId", requireAuth, updateQuizVal.validation, async (req, res) => {

  try {
    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const questionId = req.params.questionId;
    const text = req.body.text;
    const type = req.body.type;
    const imageUrl = req.body.imageUrl;
    const answers = req.body.answers;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create quiz question."});
      return;
    }

    // update a quiz question
    const results = await updateQuiz(text, type, imageUrl, answers, questionId);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(422).send({error: "Invalid format for answers."});
      } else if (results.error === 2) {
        res.status(404).send({error: "Question not found."});
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
app.get("/:pageId/observations", requireAuth, async (req, res) => {

  try {

    const pageId = req.params.pageId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(404).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to view observations."});
      return;
    }

    // get quiz observation data
    const results = await getObservations(pageId);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// submit quiz observations
app.post("/:pageId/observations", requireAuth, postObservationVal.validation, async (req, res) => {

  try {
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


// hide user quiz feedback
app.patch("/observations/:observationId/hide", requireAuth, deleteObservationVal.validation, async (req, res) => {

  try {
    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const observationId = req.params.observationId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to hide an observation."});
      return;
    }

    // hide the observation
    const results = await hideObservation(observationId);

    if (!results.error) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Observation not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a quiz question
app.delete("/:questionId", requireAuth, getQuestionVal.validation, async (req, res) => {

  try {

    const questionId = req.params.questionId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete question."});
      return;
    }

    // delete the question data
    const results = await deleteQuestion(questionId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Question not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a question edit
app.delete("/:questionId/changes", requireAuth, getQuestionVal.validation, async (req, res) => {

  try {

    const questionId = req.params.questionId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete a questions changes."});
      return;
    }

    // delete the question data
    const results = await deleteQuestionChanges(questionId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "No unpublished version of this question found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});



// publish a question
app.post("/:questionId/publish", requireAuth, getQuestionVal.validation, async (req, res) => {

  try {
    const questionId = req.params.questionId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to publish a question."});
      return;
    }

    // publish a question
    const results = await publishQuestion(questionId);

    if (results.questionId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Question not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// unpublish a question
app.post("/:questionId/unpublish", requireAuth, getQuestionVal.validation, async (req, res) => {

  try {
    const questionId = req.params.questionId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to unpublish a question."});
      return;
    }

    // unpublish a question
    const results = await unpublishQuestion(questionId);

    if (results.questionId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Question not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// move a question relative to other questions
app.patch("/:questionId/move/:direction/:mode", requireAuth, patchQuestionMoveVal.validation, async (req, res) => {

  try {

    const questionId = req.params.questionId;
    const direction = req.params.direction;
    const mode = req.params.mode;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (parseInt(mode, 10)) {
      if (!await roleCheck(5, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move question."});
        return;
      }
    } else {
      if (!await roleCheck(3, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move question."});
        return;
      }
    }

    // update a question
    let results;
    if (parseInt(mode, 10)) {
      results = await moveQuestion(questionId, parseInt(direction, 10));
    } else {
      results = await moveTempQuestion(questionId, parseInt(direction, 10));
    }

    if (results.questionId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Question not found."});
      } else if (results.error === 2) {
        if (parseInt(direction, 10)) {
          res.status(403).send({error: "No question exists above this question"});
        } else {
          res.status(403).send({error: "No question exists below this question"});
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
