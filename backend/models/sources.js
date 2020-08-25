// File: sources.js
// Description: Provides functions for working with sources

const {pool} = require("../services/database/mysqlPool");


// return all sources for the specified page
async function getSources(pageId) {

  try {

    // get the specified page
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {error: 1};
    }

    // get all of the sources for the page
    sql = "SELECT * " +
    "FROM Sources " +
    "WHERE pageId = ? " +
    "ORDER BY sourceId;";
    results = await pool.query(sql, pageId);

    finalResults = {
      sources: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for sources");
    throw Error(err);
  }

}
exports.getSources = getSources;


// create a list of sources
async function createSources(pageId, sources) {

  try {

    return {error: 1};

    // make sure the request exists
    let sql = "SELECT * " +
    "FROM Requests " +
    "WHERE requestId = ?;";
    let results = await pool.query(sql, requestId);

    if (!results[0].length) {
      return {error: 1};
    }

    // create the comment
    sql = "INSERT INTO Request_Comments (requestId, comment, review, userId) " +
    "VALUES (?, ?, ?, ?);";
    results = await pool.query(sql, [requestId, comment, status, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating comment");
    throw Error(err);
  }

}
exports.createSources = createSources;
