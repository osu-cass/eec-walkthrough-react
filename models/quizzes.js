// File: quizzes.js
// Description: Provides functions for working with quiz data.

const {pool} = require("../services/database/mysqlPool");


// gets the title and the quiz data for the specified page
async function getPageQuiz(pageId, userId) {

  try {

    let sql = "";
    let viewAll = 0;

    // check to see if the user should be allowed to see internal content
    if (userId) {
      let sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND (role = 2 OR role >= 4);";
      let results = await pool.query(sql, userId);

      if (results[0].length) {
        viewAll = 2;
      }

      // if the user was not an internal user, see if they are an external editor
      if (!viewAll) {
        sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND role = 3;";
        results = await pool.query(sql, userId);

        if (results[0].length) {
          viewAll = 1;
        }
      }
    }

    // get the specified page
    if (viewAll === 2) {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";
    } else if (viewAll === 1) {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND internal = 0;";
    } else {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 1 " +
      "AND internal = 0;";
    }

    let results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {error: 1};
    }

    const title = results[0][0].name;

    sql = "SELECT * " +
    "FROM Questions " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);

    const questions = results[0];

    // get all of the answers for each question
    for (let i = 0; i < questions.length; i++) {
      const questionId = questions[i].questionId;
      sql = "SELECT * " +
      "FROM Answers " +
      "WHERE questionId = ? " +
      "ORDER BY groupId;";
      results = await pool.query(sql, questionId);
      questions[i].answers = results[0];
    }

    const finalResults = {
      title: title,
      questions: questions
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for quiz");
    throw Error(err);
  }

}
exports.getPageQuiz = getPageQuiz;


// gets the quiz results for a specific user and page
async function getQuizResults(pageId, userId) {

  try {

    // see if the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    const title = results[0][0].name;

    // get the quiz questions
    sql = "SELECT * " +
    "FROM Questions " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);
    const questions = results[0];

    // get the quiz results
    sql = "SELECT * " +
    "FROM Scores " +
    "WHERE pageId = ? " +
    "AND userId = ?;";
    results = await pool.query(sql, [pageId, userId]);
    const scores = results[0];

    const finalResults = {
      title: title,
      questions: questions,
      scores: scores
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for quiz results");
    throw Error(err);
  }

}
exports.getQuizResults = getQuizResults;


// submit quiz results for a specific user
async function submitQuiz(userId, scores, pageId) {

  try {

    // make sure all of the scores are valid
    for (let i = 0; i < scores.length; i++) {

      if (typeof scores[i].questionId !== "number") {
        return {error: 1};
      }

      if (typeof scores[i].text !== "string") {
        return {error: 1};
      }

      if (typeof scores[i].correct !== "number") {
        return {error: 1};
      }

      const sql = "SELECT * " +
      "FROM Questions " +
      "WHERE questionId = ?;";
      const results = await pool.query(sql, scores[i].questionId);

      if (!results[0].length) {
        return {error: 2};
      }
    }

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    const results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 3};
    }

    // delete all old quiz scores for the current user
    sql = "DELETE FROM Scores " +
    "WHERE pageId = ? AND userId = ?;";
    await pool.query(sql, [pageId, userId]);

    // create all quiz scores for the current user
    for (let i = 0; i < scores.length; i++) {
      const sql = "INSERT INTO Scores (questionId, userId, text, correct, pageId) " +
      "VALUES (?, ?, ?, ?, ?);";
      await pool.query(sql, [scores[i].questionId, userId, scores[i].text.trim().toLowerCase(), scores[i].correct, pageId]);
    }

    const finalResults = {
      submitted: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error submitting quiz scores");
    throw Error(err);
  }

}
exports.submitQuiz = submitQuiz;


// create quiz questions
async function createQuiz(questions, pageId) {

  try {

    // make sure all of the questions are valid
    for (let i = 0; i < questions.length; i++) {

      if (typeof questions[i].questionId !== "number") {
        return {error: 1};
      }

      if (typeof questions[i].text !== "string") {
        return {error: 1};
      }

      if (typeof questions[i].imageUrl !== "string") {
        return {error: 1};
      }

      if (typeof questions[i].type !== "number") {
        return {error: 1};
      }

      if (!Array.isArray(questions[i].answers)) {
        return {error: 1};
      }

      let correctCount = 0;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (typeof questions[i].answers[j].questionId !== "number") {
          return {error: 1};
        }

        if (typeof questions[i].answers[j].text !== "string") {
          return {error: 1};
        }

        if (typeof questions[i].answers[j].correct !== "number") {
          return {error: 1};
        }

        if (questions[i].answers[j].correct) {
          correctCount++;
        }
      }

      if (questions[i].type === 1 && correctCount !== 1) {
        return {error: 1};
      }
    }

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 2};
    }

    // see if there are any questions we need to delete
    sql = "SELECT * " +
    "FROM Questions " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);

    const currentQuestions = results[0];

    // check each question to see if there is a match, no matches means we delete
    for (let i = 0; i < currentQuestions.length; i++) {
      let matchFound = false;

      for (let j = 0; j < questions.length; j++) {
        if (currentQuestions[i].questionId === questions[j].questionId) {
          matchFound = true;
          break;
        }
      }

      // if we found no matches delete the question
      if (!matchFound) {
        sql = "DELETE FROM Questions WHERE questionId = ?;";
        await pool.query(sql, currentQuestions[i].questionId);
      }
    }

    // create or update each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      let questionExists = false;
      let questionId = question.questionId;

      if (questionId) {
        sql = "SELECT * " +
        "FROM Questions " +
        "WHERE questionId = ?;";
        results = await pool.query(sql, question.questionId);

        if (results[0].length) {
          questionExists = true;
        }
      }

      if (questionExists) {

        // update
        sql = "UPDATE Questions " +
        "SET pageId = ?, text = ?, type = ?, imageUrl = ? " +
        "WHERE questionId = ?;";
        await pool.query(sql, [pageId, question.text, question.type, question.imageUrl, questionId]);

      } else {

        // insert
        sql = "INSERT INTO Questions (pageId, text, type, imageUrl) " +
        "VALUES (?, ?, ?, ?);";
        results = await pool.query(sql, [pageId, question.text, question.type, question.imageUrl]);
        questionId = results[0].insertId;

      }

      // delete the old answers for this question
      sql = "DELETE FROM Answers " +
      "WHERE questionId = ?;";
      await pool.query(sql, questionId);

      // create all of the new answers
      for (let j = 0; j < question.answers.length; j++) {
        let newCorrect = question.answers[j].correct;
        if (question.type !== 1) {
          newCorrect = 1;
        }
        const sql = "INSERT INTO Answers (questionId, text, correct) " +
        "VALUES (?, ?, ?);";
        await pool.query(sql, [questionId, question.answers[j].text.trim().toLowerCase(), newCorrect]);
      }
    }

    const finalResults = {
      submitted: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error submitting quiz questions");
    throw Error(err);
  }

}
exports.createQuiz = createQuiz;


// get quiz observations for a specific page
async function getObservations(pageId) {

  try {

    const sql = "SELECT Observations.*, Users.username " +
    "FROM Observations " +
    "LEFT JOIN Users " +
    "ON Observations.userId = Users.userId " +
    "WHERE pageId = ?;";
    const results = await pool.query(sql, pageId);

    const finalResults = {
      observations: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for observations");
    throw Error(err);
  }

}
exports.getObservations = getObservations;


// submit user observations
async function submitObservations(userId, pageId, observations) {

  try {

    // make sure all of the observations are valid
    for (let i = 0; i < observations.length; i++) {

      if (typeof observations[i].text !== "string") {
        return {error: 1};
      }

      if (typeof observations[i].type !== "number") {
        return {error: 1};
      }
    }

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    const results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 2};
    }

    const pageName = results[0][0].name;

    // create the new observations
    for (let i = 0; i < observations.length; i++) {
      sql = "INSERT INTO Observations (pageId, userId, type, text) " +
      "VALUES (?, ?, ?, ?);";
      await pool.query(sql, [pageId, userId, observations[i].type, observations[i].text.trim()]);
    }

    const text = `New quiz feedback for the "${pageName}" page`;

    // delete old notifications related to observations
    sql = "DELETE FROM Notifications " +
    "WHERE text = ?;";
    await pool.query(sql, text);

    // notify admins about the new observations
    sql = "INSERT INTO Notifications (requestId, userId, text, type) " +
    "VALUES (?, ?, ?, 7);";
    await pool.query(sql, [pageId, userId, text]);

    const finalResults = {
      submitted: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error submitting observations");
    throw Error(err);
  }

}
exports.submitObservations = submitObservations;


// delete an observation
async function deleteObservation(observationId) {

  try {

    // make sure the observation exists
    let sql = "SELECT * " +
    "FROM Observations " +
    "WHERE observationId = ?;";
    const results = await pool.query(sql, observationId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the observation
    sql = "DELETE FROM Observations " +
    "WHERE observationId = ?;";
    await pool.query(sql, observationId);

    const finalResults = {
      observationsDeleted: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting observation");
    throw Error(err);
  }

}
exports.deleteObservation = deleteObservation;