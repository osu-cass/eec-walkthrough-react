// File: banners.js
// Description: Provides functions for working with banner data.

const {pool} = require("../services/database/mysqlPool");


// returns all of the contributors
async function getBanners() {

  try {

    // get all banners
    const sql = "SELECT * FROM Banners ORDER BY bannerId;";
    const results = await pool.query(sql, []);

    const finalResults = {
      banners: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting banners");
    throw Error(err);
  }

}
exports.getBanners = getBanners;


// create banners
async function createBanners(banners) {

  try {

    // delete all old banners
    let sql = "DELETE FROM Banners;";
    await pool.query(sql, []);

    // create all new banners
    for (let i = 0; i < banners.length; i++) {
      sql = "INSERT INTO Banners (imageUrl) " +
      "VALUES (?);";
      await pool.query(sql, banners[i]);
    }

    const finalResults = {
      bannersCreatedSuccessfully: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating banners");
    throw Error(err);
  }

}
exports.createBanners = createBanners;