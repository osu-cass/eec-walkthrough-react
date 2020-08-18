// File: requests.js
// Description: Provides functions for working with requests

const {pool} = require("../services/database/mysqlPool");


// return a list of all requests
async function getRequests() {

  try {

    // get all external published links
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE status = 1 " +
    "ORDER BY created ASC;";

    const results = await pool.query(sql, []);

    const finalResults = {
      requests: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for requests");
    throw Error(err);
  }

}
exports.getRequests = getRequests;


// return all data for a single request
async function getRequest(requestId) {

  try {

    // get the specified request
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE requestId = ? " +
    "ORDER BY created ASC;";

    let results = await pool.query(sql, requestId);
    const finalResults = results[0][0];

    // check to see if we were able to find the request
    if (!results[0].length) {
      return {requestId: 0};
    }

    // get all object for the request
    sql = "SELECT * " +
    "FROM Request_Objects " +
    "WHERE requestId = ? " +
    "ORDER BY requestObjectId ASC;";
    results = await pool.query(sql, requestId);
    const objects = results[0];
    const fullObjects = [];

    for (let i = 0; i < objects.length; i++) {

      // get a page object
      if (objects[i].objectType === 1) {
        sql = "SELECT * " +
        "FROM Pages " +
        "WHERE approved = 0 " +
        "AND pageId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT * " +
          "FROM Temp_Pages " +
          "WHERE pageId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object
          if (results[0].length) {
            results[0][0].objectType = 1;
            fullObjects.push(results[0][0]);
          }

        } else {
          results[0][0].objectType = 1;
          fullObjects.push(results[0][0]);
        }

      }

    }

    finalResults.objects = fullObjects;
    // get all of the pages for the request

    // get all of the headers for the request

    // get all of the cards for the request

    return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getRequest = getRequest;