// File: links.js
// Description: Provides functions for working with links

const {pool} = require("../services/database/mysqlPool");


// return a list of all links
async function getLinks(onlyDead) {

  try {

    // get all external published links
    let sql = "SELECT DISTINCT itemId, contentLabel AS title, contentUrl AS url, created AS time " +
    "FROM Items " +
    "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
    "WHERE groupIndex = 3 " +
    "AND approved = 1 " +
    "AND (contentMode = 1 OR contentMode = 3) " +
    "ORDER BY created ASC;";

    // filter out all of the valid links
    if (onlyDead) {
      sql = "SELECT DISTINCT itemId, contentLabel AS title, contentUrl AS url, created AS time " +
      "FROM Items " +
      "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
      "WHERE groupIndex = 3 " +
      "AND created IS NULL " +
      "AND approved = 1 " +
      "AND (contentMode = 1 OR contentMode = 3) " +
      "ORDER BY created ASC;";
    }

    const results = await pool.query(sql, []);

    const finalResults = {
      links: results[0]
    };

    return finalResults;

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