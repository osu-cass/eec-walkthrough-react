// File: categories.js
// Description: Provides functions for working with category data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific category and all of its pages
async function getCategory(categoryId, viewAll) {

  try {

    let sql = "";

    // get the specified category
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Categories " +
      "WHERE categoryId = ? " +
      "ORDER BY pluralName ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Categories " +
      "WHERE categoryId = ? " +
      "AND internal = 0 " +
      "ORDER BY pluralName ASC;";
    }

    let results = await pool.query(sql, categoryId);

    // check to see if we were able to find the category
    if (!results[0].length) {
      return {categoryId: 0};
    }

    const finalResults = results[0][0];

    // get all of the pages that belong to the category

    // get the pages
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageType = ? " +
      "ORDER BY name ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageType = ? " +
      "AND published = 1 " +
      "AND internal = 0 " +
      "ORDER BY name ASC;";
    }

    results = await pool.query(sql, categoryId);

    finalResults.pages = results[0];

    return finalResults;

  } catch (err) {
    console.error("Error getting category");
    throw Error(err);
  }

}
exports.getCategory = getCategory;


// return a list of all of the pages sorted by category
async function getCategories(viewAll) {

  try {

    let sql = "";
    const finalResults = {
      categories: []
    }

    // get all of the categories
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Categories " +
      "ORDER BY pluralName ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Categories " +
      "WHERE internal = 0 " +
      "ORDER BY pluralName ASC;";
    }
    let results = await pool.query(sql, []);

    finalResults.categories = results[0];

    // get all pages for each category
    for (let i = 0; i < finalResults.categories.length; i++) {

      const categoryId = finalResults.categories[i].categoryId;

      if (viewAll) {
        sql = "SELECT pageId, pageType, name, description " +
        "FROM Pages " +
        "WHERE pageType = ? " +
        "ORDER BY pageType ASC, name ASC;";
      } else {
        sql = "SELECT pageId, pageType, name, description " +
        "FROM Pages " +
        "WHERE pageType = ? " +
        "AND approved = 1 " +
        "AND internal = 0 " +
        "ORDER BY pageType ASC, name ASC;";
      }

      results = await pool.query(sql, [categoryId]);
      finalResults.categories[i].pages = results[0];
    }

    return finalResults;

  } catch (err) {
    console.error("Error getting all categories");
    throw Error(err);
  }

}
exports.getCategories = getCategories;


// return a list of all of the category names
async function getCategoryNames() {

  try {

    let sql = "";
    const finalResults = {
      categories: []
    }

    // get all of the categories names

    sql = "SELECT categoryId, singleName " +
    "FROM Categories " +
    "ORDER BY singleName ASC;";

    let results = await pool.query(sql, []);

    finalResults.categories = results[0];

    return finalResults;

  } catch (err) {
    console.error("Error getting all category names");
    throw Error(err);
  }

}
exports.getCategoryNames = getCategoryNames;


// create a category
async function createCategory(singleName, pluralName, description, userId, internal) {

  try {

    // make sure the category does not already exist
    let sql = "SELECT * " +
    "FROM Categories " +
    "WHERE singleName = ? " +
    "OR pluralName = ?;";
    let results = await pool.query(sql, [singleName, pluralName]);

    if (results[0].length) {
      return {error: 1};
    }

    // create the new category
    sql = "INSERT INTO Categories (singleName, pluralName, description, userId, internal) " +
    "VALUES (?, ?, ?, ?, ?);";
    results = await pool.query(sql, [singleName, pluralName, description, userId, internal]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating category");
    throw Error(err);
  }

}
exports.createCategory = createCategory;


async function updateCategory(categoryId, singleName, pluralName, description, userId, internal) {

  try {

    // make sure that the category exists
    let sql = "SELECT * " +
    "FROM Categories " +
    "WHERE categoryId = ?;";
    let results = await pool.query(sql, categoryId);

    if (!results[0].length) {
      return {error: 1};
    }

    // update the category
    sql = "UPDATE Categories " +
    "SET singleName = ?, pluralName = ?, description = ?, userId = ?, internal = ? " +
    "WHERE categoryId = ?;";
    results = await pool.query(sql, [singleName, pluralName, description, userId, internal, categoryId]);

    const finalResults = {
      categoryId: categoryId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating category");
    throw Error(err);
  }

}
exports.updateCategory = updateCategory;