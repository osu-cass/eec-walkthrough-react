// File: categories.js
// Description: Provides functions for working with category data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific category and all of its pages
async function getCategory(categoryId, userId) {

  try {

    let viewAll = false;
    let sql = "";
    let results = "";

    // check to see if the user should be allowed to see internal content
    if (userId) {
      sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND (role = 2 OR role >= 4);";
      results = await pool.query(sql, userId);

      if (results[0].length) {
        viewAll = true;
      }
    }

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

    results = await pool.query(sql, categoryId);

    // check to see if we were able to find the category
    if (!results[0].length) {
      return {error: 1};
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
      "AND approved = 1 " +
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
async function getCategories(userId) {

  try {

    let viewAll = 0;
    let sql = "";
    let results = "";

    // check to see if the user should be allowed to see internal content
    if (userId) {
      sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND (role = 2 OR role >= 4);";
      results = await pool.query(sql, userId);

      if (results[0].length) {
        viewAll = 2;
      }

      // if the user was not an internal user, see if they are an external editor
      if (!viewAll) {
        sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND role = 3;";
        results = await pool.query(sql, userId);

        if (results[0].length) {
          viewAll = 1;
        }
      }
    }

    const finalResults = {
      categories: []
    };

    // get all of the categories
    if (viewAll === 2) {
      sql = "SELECT * " +
      "FROM Categories " +
      "ORDER BY pluralName ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Categories " +
      "WHERE internal = 0 " +
      "ORDER BY pluralName ASC;";
    }
    results = await pool.query(sql, []);

    finalResults.categories = results[0];

    // get all pages for each category
    for (let i = 0; i < finalResults.categories.length; i++) {

      const categoryId = finalResults.categories[i].categoryId;

      if (viewAll === 2) {
        sql = "SELECT pageId, pageType, name, description, approved, internal, imageUrl " +
        "FROM Pages " +
        "WHERE pageType = ? " +
        "ORDER BY pageType ASC, name ASC;";
      } else if (viewAll === 1) {
        sql = "SELECT pageId, pageType, name, description, approved, internal, imageUrl " +
        "FROM Pages " +
        "WHERE pageType = ? " +
        "AND internal = 0 " +
        "ORDER BY pageType ASC, name ASC;";
      } else {
        sql = "SELECT pageId, pageType, name, description, imageUrl " +
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
async function getCategoryNames(userId) {

  try {

    let viewAll = false;
    let sql = "";

    // check to see if the user should be allowed to see internal content
    if (userId) {
      sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND (role = 2 OR role >= 4);";
      const results = await pool.query(sql, userId);

      if (results[0].length) {
        viewAll = true;
      }
    }

    const finalResults = {
      categories: []
    };

    // get all of the categories names
    if (viewAll) {
      sql = "SELECT categoryId, singleName " +
      "FROM Categories " +
      "ORDER BY singleName ASC;";
    } else {
      sql = "SELECT categoryId, singleName " +
      "FROM Categories " +
      "WHERE internal = 0 " +
      "ORDER BY singleName ASC;";
    }

    const results = await pool.query(sql, []);

    finalResults.categories = results[0];

    return finalResults;

  } catch (err) {
    console.error("Error getting all category names");
    throw Error(err);
  }

}
exports.getCategoryNames = getCategoryNames;


// return a list of all of the category with at least one published page
async function getCategoryPublished(userId) {

  try {

    let viewAll = false;
    let sql = "";

    // check to see if the user should be allowed to see internal content
    if (userId) {
      sql = "SELECT * " +
        "FROM Users " +
        "WHERE userId = ? " +
        "AND (role = 2 OR role >= 4);";
      const results = await pool.query(sql, userId);

      if (results[0].length) {
        viewAll = true;
      }
    }

    const finalResults = {
      categories: []
    };

    // get all of the categories names
    // get all of the different page categories based on the users role
    if (viewAll) {
      sql = "SELECT DISTINCT categoryId, pluralName, singleName, C.description, C.internal " +
      "FROM Categories AS C " +
      "INNER JOIN Pages " +
      "ON categoryId = pageType " +
      "WHERE categoryId != 0 " +
      "ORDER BY pluralName ASC;";
    } else {
      sql = "SELECT DISTINCT categoryId, pluralName, singleName, C.description, C.internal " +
      "FROM Categories AS C " +
      "INNER JOIN Pages AS P " +
      "ON categoryId = pageType " +
      "WHERE C.internal = 0 " +
      "AND C.categoryId != 0 " +
      "AND P.internal = 0 " +
      "AND P.approved = 1 " +
      "ORDER BY pluralName ASC;";
    }
    const results = await pool.query(sql, []);

    finalResults.categories = results[0];

    return finalResults;

  } catch (err) {
    console.error("Error getting all category names");
    throw Error(err);
  }

}
exports.getCategoryPublished = getCategoryPublished;


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

// make changes to a category
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


// delete a category
async function deleteCategory(categoryId) {

  try {

    // check to see if the category exists
    let sql = "SELECT * " +
    "FROM Categories " +
    "WHERE categoryId = ?;";
    let results = await pool.query(sql, categoryId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure this category does not have any pages
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageType = ?;";
    results = await pool.query(sql, categoryId);

    if (results[0].length) {
      return {error: 2};
    }

    // delete the category
    sql = "DELETE " +
    "FROM Categories " +
    "WHERE categoryId = ?;";
    results = await pool.query(sql, categoryId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting category");
    throw Error(err);
  }

}
exports.deleteCategory = deleteCategory;