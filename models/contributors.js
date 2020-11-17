// File: info.js
// Description: Provides functions for working with info

const {pool} = require("../services/database/mysqlPool");


// returns a list of contributors and the requests that they have made
async function getContributorRequests() {

  try {

    // get all of the users who could possibly be contributors
    let sql = "SELECT * FROM Users " +
    "WHERE role >= 3 " +
    "ORDER BY username;";
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