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
    "ORDER BY contentLabel ASC;";


    // filter out all of the valid links
    if (onlyDead) {
      sql = "SELECT DISTINCT itemId, contentLabel AS title, contentUrl AS url, created AS time " +
      "FROM Items " +
      "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
      "WHERE groupIndex = 3 " +
      "AND created IS NULL " +
      "AND approved = 1 " +
      "AND (contentMode = 1 OR contentMode = 3) " +
      "ORDER BY contentLabel ASC;";
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

    sql = "UPDATE items " +
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