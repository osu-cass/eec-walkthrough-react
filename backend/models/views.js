// File: views.js
// Description: Provides functions for working with view data.

const {pool} = require("../services/database/mysqlPool");


// return all of the page info, headers, cards, and items for a single page
async function getViews(pageId, userId) {

  try {

    // get all of the views for the specified page
    let sql = "SELECT * " +
    "FROM Views " +
    "WHERE (pageId = ?) " +
    "AND (userId = ? OR public = 1) " +
    "ORDER BY public DESC, viewName ASC;";

    let results = await pool.query(sql, [pageId, userId]);

    const finalResults = {
      views: results[0]
    };

    // get all of the filters for each view
    for (let i = 0; i < finalResults.views.length; i++) {

      sql = "SELECT * " +
      "FROM Filters " +
      "WHERE viewId = ? " +
      "ORDER BY headerId ASC, iconId ASC;";

      results = await pool.query(sql, [finalResults.views[i].viewId, userId]);

      // sort the results into groups of headers
      const headers = [];
      let headerId = results[0][0].headerId;
      let currentHeader = {
        filters: []
      };

      for (let j = 0; j < results[0].length; j++) {
        if (results[0][j].headerId === headerId) {
          currentHeader.filters.push(results[0][j].iconId);
        } else {
          headers.push(currentHeader);
          currentHeader = {
            filters: []
          };
          header = results[0][j].headerId;
          currentHeader.filters.push(results[0][j].iconId);
        }
      }

      if (currentHeader.filters.length) {
        headers.push(currentHeader);
      }

      // store the headers in the current view
      finalResults.views[i].headers = headers;

    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for views");
    throw Error(err);
  }

}
exports.getViews = getViews;