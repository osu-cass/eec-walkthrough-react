// File: quizzes.js
// Description: Provides functions for working with quiz data.

const {pool} = require("../services/database/mysqlPool");


// gets the title and the quiz data for the specified page
async function getPageQuiz(pageId, userId, pending) {

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

    // see if we want all quiz data or just approved
    if (pending) {
      sql = "SELECT * " +
      "FROM Questions " +
      "LEFT JOIN Temp_Questions " +
      "ON questionId = tempQuestionId " +
      "WHERE pageId = ? " +
      "ORDER BY priority ASC, questionId ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Questions " +
      "WHERE pageId = ? " +
      "AND approved = 1 " +
      "ORDER BY priority ASC, questionId ASC;";
    }
    results = await pool.query(sql, pageId);

    const questions = results[0];

    // get all of the answers for each question
    for (let i = 0; i < questions.length; i++) {
      const questionId = questions[i].questionId;

      sql = "SELECT * " +
      "FROM Answers " +
      "WHERE questionId = ? " +
      "AND approved = 1 " +
      "ORDER BY groupId;";
      results = await pool.query(sql, questionId);
      questions[i].answers = results[0];

      if (pending) {
        sql = "SELECT * " +
        "FROM Answers " +
        "WHERE questionId = ? " +
        "AND approved = 0 " +
        "ORDER BY groupId;";
        results = await pool.query(sql, questionId);
        questions[i].tempAnswers = results[0];
      }

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

      if (typeof scores[i].invalid !== "number") {
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
      const sql = "INSERT INTO Scores (questionId, userId, text, invalid, correct, pageId) " +
      "VALUES (?, ?, ?, ?, ?, ?);";
      await pool.query(sql, [scores[i].questionId, userId, scores[i].text.trim().toLowerCase(), scores[i].invalid, scores[i].correct, pageId]);
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


// create a quiz question
async function createQuiz(text, type, imageUrl, answers, pageId) {

  try {

    // make sure all of the answers are valid
    if (!answers.length) {
      return {error: 1};
    }

    let correctCount = 0;
    for (let i = 0; i < answers.length; i++) {
      if (typeof answers[i].questionId !== "number") {
        return {error: 1};
      }

      if (typeof answers[i].text !== "string") {
        return {error: 1};
      }

      if (typeof answers[i].correct !== "number") {
        return {error: 1};
      }

      if (typeof answers[i].groupId !== "number") {
        return {error: 1};
      }

      if (answers[i].correct) {
        correctCount++;
      }

      // don't allow two identical answers
      for (let j = 0; j < answers.length; j++) {
        if (i !== j && answers[i].text === answers[j].text) {
          return {error: 1};
        }
      }
    }

    if (type === 1 && correctCount !== 1) {
      return {error: 1};
    }

    if (type === 4 && correctCount < 1) {
      return {error: 1};
    }

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 2};
    }

    // create the question
    sql = "INSERT INTO Questions (pageId, text, type, imageUrl, approved) " +
    "VALUES (?, ?, ?, ?, 0);";
    results = await pool.query(sql, [pageId, text, type, imageUrl]);
    const questionId = results[0].insertId;

    // create all of the new answers
    for (let i = 0; i < answers.length; i++) {
      let newCorrect = answers[i].correct;
      if (type !== 1 && type !== 4) {
        newCorrect = 1;
      }
      const sql = "INSERT INTO Answers (questionId, text, correct, groupId) " +
      "VALUES (?, ?, ?, ?);";
      await pool.query(sql, [questionId, answers[i].text.trim().toLowerCase(), newCorrect, answers[i].groupId]);
    }

    const finalResults = {
      insertId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating quiz question");
    throw Error(err);
  }

}
exports.createQuiz = createQuiz;


// update a quiz question
async function updateQuiz(text, type, imageUrl, answers, questionId) {

  try {

    // make sure all of the answers are valid
    if (!answers.length) {
      return {error: 1};
    }

    let correctCount = 0;
    for (let i = 0; i < answers.length; i++) {
      if (typeof answers[i].questionId !== "number") {
        return {error: 1};
      }

      if (typeof answers[i].text !== "string") {
        return {error: 1};
      }

      if (typeof answers[i].correct !== "number") {
        return {error: 1};
      }

      if (typeof answers[i].groupId !== "number") {
        return {error: 1};
      }

      if (answers[i].correct) {
        correctCount++;
      }

      // don't allow two identical answers
      for (let j = 0; j < answers.length; j++) {
        if (i !== j && answers[i].text === answers[j].text) {
          return {error: 1};
        }
      }
    }

    if (type === 1 && correctCount !== 1) {
      return {error: 1};
    }

    if (type === 4 && correctCount < 1) {
      return {error: 1};
    }

    // make sure the question exists
    let sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ?;";
    const results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 2};
    }

    const approved = results[0][0].approved;

    // delete any old temporary question and answers with the same ID
    sql = "DELETE FROM Temp_Questions " +
    "WHERE tempQuestionId = ?;";
    await pool.query(sql, [questionId]);

    sql = "DELETE FROM Answers " +
    "WHERE questionId = ? " +
    "AND approved = 0;";
    await pool.query(sql, [questionId]);

    // either insert or patch depending on if the original question was approved
    if (approved) {
      sql = "INSERT INTO Temp_Questions (tempQuestionId, tempText, tempType, tempImageUrl) " +
      "VALUES (?, ?, ?, ?);";
      await pool.query(sql, [questionId, text, type, imageUrl]);
    } else {
      sql = "UPDATE Questions " +
      "SET text = ?, type = ?, imageUrl = ? " +
      "WHERE questionId = ?;";
      await pool.query(sql, [text, type, imageUrl, questionId]);
    }

    // create all of the new answers
    for (let i = 0; i < answers.length; i++) {
      let newCorrect = answers[i].correct;
      if (type !== 1 && type !== 4) {
        newCorrect = 1;
      }
      const sql = "INSERT INTO Answers (questionId, text, correct, groupId) " +
      "VALUES (?, ?, ?, ?);";
      await pool.query(sql, [questionId, answers[i].text.trim().toLowerCase(), newCorrect, answers[i].groupId]);
    }

    const finalResults = {
      insertId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating quiz question");
    throw Error(err);
  }

}
exports.updateQuiz = updateQuiz;


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


// hide an observation
async function hideObservation(observationId) {

  try {

    // make sure the observation exists
    let sql = "SELECT * " +
    "FROM Observations " +
    "WHERE observationId = ?;";
    const results = await pool.query(sql, observationId);

    if (!results[0].length) {
      return {error: 1};
    }

    // hide the observation
    sql = "UPDATE Observations " +
    "SET hidden = 1 " +
    "WHERE observationId = ?;";
    await pool.query(sql, observationId);

    const finalResults = {
      observationsHidden: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error hiding observation");
    throw Error(err);
  }

}
exports.hideObservation = hideObservation;


// delete a question
async function deleteQuestion(questionId) {

  try {

    // check to see if the question exists
    let sql = "SELECT * " +
      "FROM Questions " +
      "WHERE questionId = ?;";
    let results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the question
    sql = "DELETE " +
      "FROM Questions " +
      "WHERE questionId = ?;";

    results = await pool.query(sql, questionId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting question");
    throw Error(err);
  }

}
exports.deleteQuestion = deleteQuestion;


// delete a questions changes
async function deleteQuestionChanges(questionId) {

  try {

    // checks to see if there is an edited version of the question to delete
    let sql = "SELECT * " +
    "FROM Answers " +
    "WHERE questionId = ? " +
    "AND approved = 0;";
    let results = await pool.query(sql, questionId);

    sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ?;";
    const checkApproved = await pool.query(sql, questionId);

    // delete the edited version of the question if it exists
    if (results[0].length && checkApproved[0].length && checkApproved[0][0].approved) {

      sql = "DELETE " +
        "FROM Temp_Questions " +
        "WHERE tempQuestionId = ?;";
      await pool.query(sql, questionId);

      sql = "DELETE " +
      "FROM Answers " +
      "WHERE questionId = ? " +
      "AND approved = 0;";
      results = await pool.query(sql, questionId);

      const finalResults = {
        affectedRows: results[0].affectedRows
      };

      return finalResults;

    } else {

      // there was no temp question to delete, there may still be the real question
      // to delete, as long as it has never been published

      if (checkApproved[0].length && !checkApproved[0][0].approved) {

        sql = "DELETE " +
        "FROM Questions " +
        "WHERE questionId = ? " +
        "AND approved = 0;";
        results = await pool.query(sql, questionId);

        const finalResults = {
          affectedRows: results[0].affectedRows
        };

        return finalResults;

      } else {
        return {error: 1};
      }
    }

  } catch (err) {
    console.error("Error deleting question changes");
    throw Error(err);
  }

}
exports.deleteQuestionChanges = deleteQuestionChanges;


// publish a question
async function publishQuestion(questionId) {

  try {

    // make sure that the question exists
    let sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ?;";
    let results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 1};
    }

    // check if there is new question data
    sql = "SELECT * " +
    "FROM Temp_Questions " +
    "WHERE tempQuestionId = ?;";
    results = await pool.query(sql, questionId);

    let tempFound = false;
    if (results[0].length) {
      tempFound = true;
    }

    // if there is new question data, replace the old data
    // otherwise simply update the approved value
    if (tempFound) {

      const text = results[0][0].tempText;
      const type = results[0][0].tempType;
      const priority = results[0][0].tempPriority;
      const imageUrl = results[0][0].tempImageUrl;

      // update the published question
      sql = "UPDATE Questions " +
      "SET text = ?, type = ?, priority = ?, imageUrl = ?, created = CURRENT_TIMESTAMP, approved = 1 " +
      "WHERE questionId = ?;";
      results = await pool.query(sql, [text, type, priority, imageUrl, questionId]);

      // delete the old temp question
      sql = "DELETE FROM Temp_Questions " +
      "WHERE tempQuestionId = ?;";
      await pool.query(sql, questionId);

    } else {

      sql = "UPDATE Questions " +
      "SET approved = 1 " +
      "WHERE questionId = ?;";
      await pool.query(sql, questionId);

    }

    // delete all of the old answers
    sql = "DELETE FROM Answers " +
    "WHERE questionId = ? " +
    "AND approved = 1;";
    await pool.query(sql, questionId);

    // approve all of the new answers
    sql = "UPDATE Answers " +
    "SET approved = 1 " +
    "WHERE questionId = ?;";
    results = await pool.query(sql, questionId);

    const finalResults = {
      questionId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error publishing question");
    throw Error(err);
  }

}
exports.publishQuestion = publishQuestion;


// unpublish a question
async function unpublishQuestion(questionId) {

  try {

    // make sure that the question exists
    let sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ?;";
    const results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 1};
    }

    // set the question to unpublished
    sql = "UPDATE Questions " +
    "SET approved = 0 " +
    "WHERE questionId = ?;";
    await pool.query(sql, questionId);

    // delete any old temp questions
    sql = "DELETE FROM Temp_Questions " +
    "WHERE tempQuestionId = ?;";
    await pool.query(sql, questionId);

    // delete all of the edited answers
    sql = "DELETE FROM Answers " +
    "WHERE questionId = ? " +
    "AND approved = 0;";
    await pool.query(sql, questionId);

    // unapprove all of the published answers
    sql = "UPDATE Answers " +
    "SET approved = 0 " +
    "WHERE questionId = ?;";
    await pool.query(sql, questionId);

    const finalResults = {
      questionId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error unpublishing question");
    throw Error(err);
  }

}
exports.unpublishQuestion = unpublishQuestion;


// move a published question
async function moveQuestion(questionId, direction) {

  try {

    // make sure that the question exists
    let sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ? " +
    "AND approved = 1";
    let results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 1};
    }

    const pageId = results[0][0].pageId;

    // get all of the questions and temp questions under the current page
    sql = "SELECT * " +
    "FROM Questions " +
    "LEFT JOIN Temp_Questions " +
    "ON questionId = tempQuestionId " +
    "WHERE pageId = ? " +
    "ORDER BY priority ASC, questionId ASC";
    results = await pool.query(sql, pageId);

    // create an array with all of the questions
    // each questions has an id, type (normal / temp), and a priority
    const questionOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempQuestionId > 0) {

        const questionObj = {
          id: results[0][i].questionId,
          type: "norm",
          order: results[0][i].priority,
          show: "show"
        };

        const tempQuestionObj = {
          id: results[0][i].tempQuestionId,
          type: "temp",
          order: results[0][i].tempPriority,
          show: "hidden"
        };

        questionOrderArray.push(questionObj);
        questionOrderArray.push(tempQuestionObj);

      } else {
        const questionObj = {
          id: results[0][i].questionId,
          type: "norm",
          order: results[0][i].priority,
          show: "show"
        };
        questionOrderArray.push(questionObj);
      }
    }

    // sort the array of questions by order index
    questionOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified question
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (parseInt(questionOrderArray[i].id, 10) === parseInt(questionId, 10) && questionOrderArray[i].type === "norm") {
        if (direction) {
          // try to move up and skip hidden questions
          for (let j = i; j > 0; j--) {
            const tempObj = questionOrderArray[j - 1];
            questionOrderArray[j - 1] = questionOrderArray[j];
            questionOrderArray[j] = tempObj;
            if (questionOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden questions
          for (let j = i; j < questionOrderArray.length - 1; j++) {
            const tempObj = questionOrderArray[j + 1];
            questionOrderArray[j + 1] = questionOrderArray[j];
            questionOrderArray[j] = tempObj;
            if (questionOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the questions and split it into normal and temp questions
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (questionOrderArray[i].type === "temp") {
        tempArray.push(parseInt(questionOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(questionOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (questionOrderArray[i].type === "temp") {
        tempArray.push(questionOrderArray[i].id);
      } else {
        normArray.push(questionOrderArray[i].id);
      }
    }

    // update the published questions
    if (normArray.length) {
      sql = "UPDATE Questions " +
      "SET priority = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN questionId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE questionId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished cards
    if (tempArray.length) {
      sql = "UPDATE Temp_Questions " +
      "SET tempPriority = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempQuestionId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempQuestionId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

    const finalResults = {
      questionId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving question");
    throw Error(err);
  }

}
exports.moveQuestion = moveQuestion;


// move an unpublished question
async function moveTempQuestion(questionId, direction) {

  try {

    // make sure that the question exists
    let sql = "SELECT * " +
    "FROM Questions " +
    "WHERE questionId = ? ";
    let results = await pool.query(sql, questionId);

    if (!results[0].length) {
      return {error: 1};
    }

    const pageId = results[0][0].pageId;
    const approved = results[0][0].approved;

    let questionType = "norm";

    // see if this card is already approved
    if (approved) {

      // since it is approved, get the temp question version of the question
      const sql = "SELECT * " +
      "FROM Temp_Questions " +
      "WHERE tempQuestionId = ? ";
      results = await pool.query(sql, questionId);
      questionType = "temp";

      if (!results[0].length) {
        return {error: 1};
      }

    }

    // get all of the questions and temp questions under the current page
    sql = "SELECT * " +
    "FROM Questions " +
    "LEFT JOIN Temp_Questions " +
    "ON questionId = tempQuestionId " +
    "WHERE pageId = ? " +
    "ORDER BY priority ASC, questionId ASC";
    results = await pool.query(sql, pageId);

    // create an array with all of the questions
    // each question has an id, type (normal / temp), and a priority
    const questionOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempQuestionId > 0) {

        const questionObj = {
          id: results[0][i].questionId,
          type: "norm",
          order: results[0][i].priority,
          show: "hidden"
        };

        const tempQuestionObj = {
          id: results[0][i].tempQuestionId,
          type: "temp",
          order: results[0][i].tempPriority,
          show: "show"
        };

        questionOrderArray.push(questionObj);
        questionOrderArray.push(tempQuestionObj);

      } else {
        const questionObj = {
          id: results[0][i].questionId,
          type: "norm",
          order: results[0][i].priority,
          show: "show"
        };
        questionOrderArray.push(questionObj);
      }
    }

    // sort the array of questions by order index
    questionOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified question
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (parseInt(questionOrderArray[i].id, 10) === parseInt(questionId, 10) && questionOrderArray[i].type === questionType) {
        if (direction) {
          // try to move up and skip hidden questions
          for (let j = i; j > 0; j--) {
            const tempObj = questionOrderArray[j - 1];
            questionOrderArray[j - 1] = questionOrderArray[j];
            questionOrderArray[j] = tempObj;
            if (questionOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden questions
          for (let j = i; j < questionOrderArray.length - 1; j++) {
            const tempObj = questionOrderArray[j + 1];
            questionOrderArray[j + 1] = questionOrderArray[j];
            questionOrderArray[j] = tempObj;
            if (questionOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the questions and split it into normal and temp questions
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (questionOrderArray[i].type === "temp") {
        tempArray.push(parseInt(questionOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(questionOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < questionOrderArray.length; i++) {
      if (questionOrderArray[i].type === "temp") {
        tempArray.push(questionOrderArray[i].id);
      } else {
        normArray.push(questionOrderArray[i].id);
      }
    }

    // update the published questions
    if (normArray.length) {
      sql = "UPDATE Questions " +
      "SET priority = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN questionId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE questionId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished questions
    if (tempArray.length) {
      sql = "UPDATE Temp_Questions " +
      "SET tempPriority = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempQuestionId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempQuestionId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

    const finalResults = {
      questionId: questionId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving question");
    throw Error(err);
  }

}
exports.moveTempQuestion = moveTempQuestion;