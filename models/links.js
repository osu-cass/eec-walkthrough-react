// File: links.js
// Description: Provides functions for working with links

const {pool} = require("../services/database/mysqlPool");


// return a list of all links
async function getLinks(onlyDead, sort, order, cursor) {
  try {

    const ASC = 1;
    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let links;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // get all external published links (initial sql query)
    let sql = "SELECT DISTINCT itemId, contentLabel AS title, contentUrl AS url, " +
    "created AS time, UNIX_TIMESTAMP(created) AS unixTime " +
    "FROM Items " +
    "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
    "WHERE groupIndex = 3 " +
    "AND approved = 1 " +
    "AND (contentMode = 1 OR contentMode = 3) ";

    // see if we should only get invalid links
    if (onlyDead) {
      sql += "AND created IS NULL ";
    }

    // only use the cursor if it isn't the initial search request
    if (cursor.primary !== "null") {

      let orderChar = "<";
      if (order === ASC) {
        orderChar = ">";
      }

      // We set our primary cursor to the last valid time if it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by item ID.

      switch (sort) {
        case 0:
          sql += `AND (IFNULL(UNIX_TIMESTAMP(created), 0) ${orderChar}= ? AND ` +
            `(IFNULL(UNIX_TIMESTAMP(created), 0) ${orderChar} ? OR itemId >= ? )) `;
          break;
        case 1:
          sql += `AND (contentLabel ${orderChar}= ? AND ` +
            `(contentLabel ${orderChar} ? OR itemId >= ? )) `;
          break;
        case 2:
          sql += `AND (contentUrl ${orderChar}= ? AND ` +
            `(contentUrl ${orderChar} ? OR itemId >= ? )) `;
          break;
        default:
          sql += `AND (UNIX_TIMESTAMP(created) ${orderChar}= ? AND ` +
            `(UNIX_TIMESTAMP(created) ${orderChar} ? OR itemId >= ? )) `;
      }
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.secondary);

    }

    // get the results in the order we are sorting by
    switch (sort) {
      case 0:
        sql += "ORDER BY unixTime ";
        break;
      case 1:
        sql += "ORDER BY contentLabel ";
        break;
      case 2:
        sql += "ORDER BY contentUrl ";
        break;
      default:
        sql += "ORDER BY unixTime ";
    }

    // order by ascending or descending
    if (order === ASC) {
      sql += "ASC, itemId ASC LIMIT ?;";
    } else {
      sql += "DESC, itemId ASC LIMIT ?;";
    }

    // get the number of results per page (plus the next cursor)
    sqlArray.push(RESULTS_PER_PAGE + 1);

    // perform the query
    const results = await pool.query(sql, sqlArray);


    // get the next cursor and return the correct number of links
    if (results[0].length < RESULTS_PER_PAGE + 1) {

      // if we have returned the last of the data then we return
      // a null next cursor
      links = results[0];
      nextCursor.primary = "null";
      nextCursor.secondary = "null";

    } else {

      // Our next cursor will store a primary and secondary value.
      // The primary value is the main value we are sorting by.
      // The secondary value is the item ID and it is used to sort when we
      // have results with matching primary values.
      links = results[0].slice(0, -1);
      const nextLink = results[0][RESULTS_PER_PAGE];
      console.log("nextLink", nextLink);

      switch (sort) {
        case 0:
          nextCursor.primary = String(nextLink.unixTime);
          if (nextCursor.primary === "undefined") {
            nextCursor.primary = "0";
          }
          break;
        case 1:
          nextCursor.primary = String(nextLink.title);
          break;
        case 2:
          nextCursor.primary = String(nextLink.url);
          break;
        default:
          nextCursor.primary = String(nextLink.unixTime);
          if (nextCursor.primary === "undefined") {
            nextCursor.primary = "0";
          }
      }
      nextCursor.secondary = String(nextLink.itemId);

    }

    console.log(nextCursor);
    return {
      links: links,
      nextCursor: nextCursor
    };

  } catch (err) {
    console.error("Error searching for links");
    throw Error(err);
  }
}
exports.getLinks = getLinks;


// update a link
async function updateLink(linkId, url) {

  try {

    // make sure that the link exists
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE itemId = ?;";
    const results = await pool.query(sql, linkId);

    if (!results[0].length) {
      return {error: 1};
    }

    sql = "UPDATE Items " +
    "SET contentUrl = ?, created = now() " +
    "WHERE itemId = ?;";

    // perform the update query
    await pool.query(sql, [url, linkId]);

    const finalResults = {
      linkId: linkId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating link");
    throw Error(err);
  }

}
exports.updateLink = updateLink;


// update a link's timestamp
async function updateLinkTime(itemId, deadLink) {

  try {

    // make sure that the item exists
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE itemId = ?;";
    let results = await pool.query(sql, itemId);

    if (!results[0].length) {
      return {error: 1};
    }

    // create the SQL query
    if (deadLink) {
      sql = "UPDATE Items " +
      "SET created = null " +
      "WHERE itemId = ?;";
    } else {
      sql = "UPDATE Items " +
      "SET created = now() " +
      "WHERE itemId = ?;";
    }

    // perform the update query
    results = await pool.query(sql, itemId);

    // get the generated timestamp
    sql = "SELECT created " +
    "FROM Items " +
    "WHERE itemId = ?;";

    results = await pool.query(sql, itemId);

    const timestamp = results[0][0].created;

    const finalResults = {
      timestamp: timestamp
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating link's timestamp");
    throw Error(err);
  }

}
exports.updateLinkTime = updateLinkTime;