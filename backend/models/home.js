// File: home.js
// Description: Provides functions for working with homepage data.

const {pool} = require("../services/database/mysqlPool");


// return information about the homepage content
async function getHome() {

  try {

    const sql = "SELECT * FROM Home;";
    const results = await pool.query(sql, []);

    // check to see if we were able to find the content
    if (!results[0].length) {
      return {homeId: 0};
    }

    const finalResults = results[0][0];
    finalResults.homeId = 1;

    return finalResults;

  } catch (err) {
    console.error("Error searching for homepage data");
    throw Error(err);
  }

}
exports.getHome = getHome;