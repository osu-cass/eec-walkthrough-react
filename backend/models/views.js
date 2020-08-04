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

      // see if we have any filters set
      if (!results[0].length) {
        finalResults.views[i].headers = [];
        continue;
      }

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


// create a view for a specific page
async function createView(pageId, headers, publicView, viewName, userId) {

  try {

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // create the view
    sql = "INSERT INTO Views (pageId, userId, viewName, public) " +
    "VALUES (?, ?, ?, ?);";
    results = await pool.query(sql, [pageId, userId, viewName, publicView]);
    const viewId = results[0].insertId;

    // add the filters to the view
    for (let i = 0; i < headers.length; i++) {

      // make sure the current header exists
      let sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";
      let results = await pool.query(sql, headers[i].headerId);

      if (!results[0].length) {
        return {error: 2};
      }

      // save each filter
      for (let j = 0; j < headers[i].filters.length; j++) {

        // confirm that the filter is storing icon IDs
        if (!Number.isInteger(headers[i].filters[j])) {
          return {error: 2};
        }

        sql = "INSERT INTO Filters (viewId, headerId, iconId) " +
        "VALUES (?, ?, ?);";
        results = await pool.query(sql, [viewId, headers[i].headerId, headers[i].filters[j]]);
      }

    }

    const finalResults = {
      insertId: viewId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating view");
    throw Error(err);
  }

}
exports.createView = createView;


// delete a view
async function deleteView(viewId, userId) {

  try {

    // check to see if the view exists
    let sql = "SELECT * " +
      "FROM Views " +
      "WHERE viewId = ?;";

    let results = await pool.query(sql, viewId);

    if (!results[0].length) {
      return {error: 1};
    }

    const viewOwner = results[0][0].userId;

    // check the users current role
    sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";

    results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 2};
    }

    const userRole = results[0][0].role;

    console.log("userId", userId, "viewOwner", viewOwner, "userRole", userRole)

    // confirm that the user is allowed to delete the view
    if (userId !== viewOwner && userRole !== 4) {
      return {error: 2};
    }

    // delete the view
    sql = "DELETE " +
    "FROM Views " +
    "WHERE viewId = ?;";

    results = await pool.query(sql, viewId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting view");
    throw Error(err);
  }

}
exports.deleteView = deleteView;