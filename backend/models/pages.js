// File: pages.js
// Description: Provides functions for working with page data.

const {pool} = require('../services/database/mysqlPool');

// Return a list of all of the industries and their related subjects
async function getIndustries() {

  const industryValue = 1;

  try {

    let sql = "SELECT P.pageId AS industryId, P.name AS industryName " +
      "FROM Pages AS P " +
      "WHERE pageType=?;";

    let results = await pool.query(sql, industryValue);
    results = {
      industries: results[0]
    }

    console.log("RESULTS:", results);
    return results;

  } catch (err) {
    console.log("Error searching for industries");
    throw Error(err);
  }

}
exports.getIndustries = getIndustries;