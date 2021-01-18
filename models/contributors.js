// File: info.js
// Description: Provides functions for working with info

const {pool} = require("../services/database/mysqlPool");


// returns all of the contributors
async function getContributors() {

  try {

    // get all contributors
    const sql = "SELECT * FROM Contributors " +
    "WHERE active = 1 " +
    "ORDER BY priority;";
    const results = await pool.query(sql, []);

    const finalResults = {
      contributors: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting contributors");
    throw Error(err);
  }

}
exports.getContributors = getContributors;


// returns all of the pending contributors
async function getPendingContributors() {

  try {

    // get all contributors
    const sql = "SELECT tempContributorId AS contributorId, tempName AS name, " +
    "tempTitle AS title, tempDescription AS description, tempImageUrl AS imageUrl " +
    "FROM Temp_Contributors " +
    "ORDER BY tempContributorId ASC;";
    const results = await pool.query(sql, []);

    const finalResults = {
      contributors: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting pending contributors");
    throw Error(err);
  }

}
exports.getPendingContributors = getPendingContributors;


// returns a list of contributors and the requests that they have made
async function getContributorRequests() {

  try {

    // get all of the users who could possibly be contributors
    let sql = "SELECT userId, firstName, lastName, username, role, " +
    "Contributors.*, Temp_Contributors.* " +
    "FROM Users " +
    "LEFT JOIN Contributors " +
    "ON Users.userId = Contributors.contributorId " +
    "LEFT JOIN Temp_Contributors " +
    "ON Users.userId = Temp_Contributors.tempContributorId " +
    "WHERE role >= 3 " +
    "ORDER BY firstName ASC, lastName ASC;";
    let results = await pool.query(sql, []);

    const contributors = results[0];

    const finalResults = {
      contributors: contributors
    };

    // get all of the requests that each contributor has made
    for (let i = 0; i < contributors.length; i++) {
      sql = "SELECT * FROM Requests " +
      "WHERE userId = ? " +
      "ORDER BY requestId;";
      results = await pool.query(sql, contributors[i].userId);

      finalResults.contributors[i].requests = results[0];
    }

    return finalResults;

  } catch (err) {
    console.error("Error getting contributor requests");
    throw Error(err);
  }

}
exports.getContributorRequests = getContributorRequests;


// create a contributor
async function createContributor(userId, name, title, description, imageUrl, active) {

  try {

    // see if the contributor already exists
    let sql = "SELECT * FROM Contributors " +
    "WHERE contributorId = ?;";
    let results = await pool.query(sql, userId);

    let exists = false;
    if (results[0].length) {
      exists = true;
    }

    // create or update, based on if the contributor already exists
    if (exists) {
      sql = "UPDATE Contributors " +
      "SET name = ?, title = ?, description = ?, imageUrl = ?, active = ?, priority = ? " +
      "WHERE contributorId = ?;";
      results = await pool.query(sql, [name, title, description, imageUrl, active, 10, userId]);
    } else {
      sql = "INSERT INTO Contributors (contributorId, name, title, description, imageUrl, active, priority) " +
      "VALUES (?, ?, ?, ?, ?, ?, 10);";
      results = await pool.query(sql, [userId, name, title, description, imageUrl, active]);
    }

    const finalResults = {
      contributorId: userId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating contributor");
    throw Error(err);
  }

}
exports.createContributor = createContributor;


// create a contributor submission
async function createContributorSubmission(userId, name, title, description, imageUrl) {

  try {

    // get the current user's username
    let sql = "SELECT username FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    const username = results[0][0].username;

    // see if the contributor already exists
    sql = "SELECT * FROM Temp_Contributors " +
    "WHERE tempContributorId = ?;";
    results = await pool.query(sql, userId);

    let exists = false;
    if (results[0].length) {
      exists = true;
    }

    // create or update, based on if the contributor already exists
    if (exists) {
      sql = "UPDATE Temp_Contributors " +
      "SET tempName = ?, tempTitle = ?, tempDescription = ?, tempImageUrl = ?, tempPriority = ? " +
      "WHERE tempContributorId = ?;";
      results = await pool.query(sql, [name, title, description, imageUrl, 10, userId]);
    } else {
      sql = "INSERT INTO Temp_Contributors (tempContributorId, tempName, tempTitle, tempDescription, tempImageUrl, tempPriority) " +
      "VALUES (?, ?, ?, ?, ?, 10);";
      results = await pool.query(sql, [userId, name, title, description, imageUrl]);
    }

    // create a notification message for admins
    const notificationMessage = `${username} has submitted a contributor card that is awaiting review`;

    // delete outdated notifications about submissions
    sql = "DELETE FROM Notifications " +
    "WHERE text = ? AND type = 6;";
    await pool.query(sql, notificationMessage);

    // create new notifications about the submission
    sql = "SELECT userId " +
    "FROM Users " +
    "WHERE role = 5;";
    results = await pool.query(sql, []);

    const admins = results[0];

    for (let i = 0; i < admins.length; i++) {
      sql = "INSERT INTO Notifications (requestId, userId, text, type) " +
      "VALUES (?, ?, ?, 6);";
      await pool.query(sql, [0, admins[i].userId, notificationMessage]);
    }

    const finalResults = {
      contributorId: userId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating contributor submission");
    throw Error(err);
  }

}
exports.createContributorSubmission = createContributorSubmission;


// reject a contributor submission
async function rejectContributorSubmission(contributorId) {

  try {

    // see if the contributor submission exists
    let sql = "SELECT * FROM Temp_Contributors " +
    "WHERE tempContributorId = ?;";
    let results = await pool.query(sql, contributorId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the submission
    sql = "DELETE " +
    "FROM Temp_Contributors " +
    "WHERE tempContributorId = ?;";
    results = await pool.query(sql, contributorId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    // delete any pending notifications
    // get the current contributor's username
    sql = "SELECT username FROM Users " +
    "WHERE userId = ?;";
    results = await pool.query(sql, contributorId);

    if (!results[0].length) {
      return {error: 1};
    }

    // get information about the message we need to delete
    const username = results[0][0].username;
    const notificationMessage = `${username} has submitted a contributor card that is awaiting review`;

    // delete outdated notifications
    sql = "DELETE FROM Notifications " +
    "WHERE text = ? AND type = 6;";
    await pool.query(sql, notificationMessage);

    return finalResults;

  } catch (err) {
    console.error("Error rejecting contributor submission");
    throw Error(err);
  }

}
exports.rejectContributorSubmission = rejectContributorSubmission;


// accept a contributor submission
async function acceptContributorSubmission(contributorId) {

  try {

    // see if the contributor submission exists
    let sql = "SELECT * FROM Temp_Contributors " +
    "WHERE tempContributorId = ?;";
    let results = await pool.query(sql, contributorId);

    if (!results[0].length) {
      return {error: 1};
    }

    // save all of the submission information
    const submission = results[0][0];
    const name = submission.tempName;
    const title = submission.tempTitle;
    const description = submission.tempDescription;
    const imageUrl = submission.tempImageUrl;
    const active = 1;
    const userId = contributorId;

    // delete the submission
    sql = "DELETE " +
    "FROM Temp_Contributors " +
    "WHERE tempContributorId = ?;";
    results = await pool.query(sql, contributorId);

    // see if the contributor already exists
    sql = "SELECT * FROM Contributors " +
    "WHERE contributorId = ?;";
    results = await pool.query(sql, userId);

    let exists = false;
    if (results[0].length) {
      exists = true;
    }

    // create or update, based on if the contributor already exists
    if (exists) {
      sql = "UPDATE Contributors " +
      "SET name = ?, title = ?, description = ?, imageUrl = ?, active = ?, priority = ? " +
      "WHERE contributorId = ?;";
      results = await pool.query(sql, [name, title, description, imageUrl, active, 10, userId]);
    } else {
      sql = "INSERT INTO Contributors (contributorId, name, title, description, imageUrl, active, priority) " +
      "VALUES (?, ?, ?, ?, ?, ?, 10);";
      results = await pool.query(sql, [userId, name, title, description, imageUrl, active]);
    }

    const finalResults = {
      affectedRows: 1
    };

    // delete any pending notifications
    // get the current contributor's username
    sql = "SELECT username FROM Users " +
    "WHERE userId = ?;";
    results = await pool.query(sql, contributorId);

    if (!results[0].length) {
      return {error: 1};
    }

    // get information about the message we need to delete
    const username = results[0][0].username;
    const notificationMessage = `${username} has submitted a contributor card that is awaiting review`;

    // delete outdated notifications
    sql = "DELETE FROM Notifications " +
    "WHERE text = ? AND type = 6;";
    await pool.query(sql, notificationMessage);

    return finalResults;

  } catch (err) {
    console.error("Error rejecting contributor submission");
    throw Error(err);
  }

}
exports.acceptContributorSubmission = acceptContributorSubmission;