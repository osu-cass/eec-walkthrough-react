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