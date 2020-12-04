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
      "WHERE questionId = ?;";
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