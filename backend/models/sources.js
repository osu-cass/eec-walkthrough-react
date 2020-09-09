// File: sources.js
// Description: Provides functions for working with sources

const {pool} = require("../services/database/mysqlPool");


// return all sources for the specified page
async function getSources(pageId) {

  try {

    // make sure the page exists
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

    const finalResults = {
      sources: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for sources");
    throw Error(err);
  }

}
exports.getSources = getSources;


// create a single source
async function createSingleSource(pageId, text, url) {

  try {

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {error: 1};
    }

    // add the new source
    sql = "INSERT INTO Sources (text, url, pageId) " +
    "VALUES (?, ?, ?);";
    results = await pool.query(sql, [text, url, pageId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating source");
    throw Error(err);
  }

}
exports.createSingleSource = createSingleSource;


// create a list of sources
async function createSources(pageId, sources) {

  try {

    // make sure the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    const results = await pool.query(sql, pageId);

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {error: 1};
    }

    // start by deleting the source ids that aren't present
    const sqlArray = [];

    sql = "DELETE FROM Sources " +
    "WHERE pageId = ? ";
    sqlArray.push(pageId);

    for (let i = 0; i < sources.length; i++) {
      sql += "AND sourceID != ? ";
      sqlArray.push(parseInt(sources[i].sourceId, 10));
    }

    await pool.query(sql, sqlArray);

    // attempt to add or update the sources
    for (let i = 0; i < sources.length; i++) {

      // make sure we have a valid source
      if (typeof sources[i].text !== "string" || typeof sources[i].url !== "string") {
        continue;
      }

      if (sources[i].text.length < 1) {
        continue;
      }

      // if we have a valid source ID then we are updating
      // otherwise we are creating a new source
      if (parseInt(sources[i].sourceId, 10) > 0) {

        sql = "UPDATE Sources " +
        "SET text = ?, url = ? " +
        "WHERE sourceId = ? " +
        "AND pageId = ?;";
        await pool.query(sql, [sources[i].text, sources[i].url, sources[i].sourceId, pageId]);

      } else {

        sql = "INSERT INTO Sources (text, url, pageId) " +
        "VALUES (?, ?, ?);";
        await pool.query(sql, [sources[i].text, sources[i].url, pageId]);

      }

    }

    const finalResults = {
      sourcesApproved: sources.length
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating sources");
    throw Error(err);
  }

}
exports.createSources = createSources;
