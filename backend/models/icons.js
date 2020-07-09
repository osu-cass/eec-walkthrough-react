// File: icons.js
// Description: Provides functions for working with icons

const {pool} = require("../services/database/mysqlPool");


// return a list of all icons
async function getIcons() {

  try {
    // get all icons
    const sql = "SELECT * " +
		"FROM Icons " +
		"ORDER BY typeKeyword ASC;";

    const results = await pool.query(sql, []);

    const finalResults = {
      icons: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for icons");
    throw Error(err);
  }

}
exports.getIcons = getIcons;


// update an icon
async function updateIcon(iconId, typeKeyword, typeName, groupIndex, color) {

  try {

    const sqlArray = [];

    // make sure that the icon exists
    let sql = "SELECT * " +
    "FROM Icons " +
    "WHERE iconType = ?;";
    let results = await pool.query(sql, iconId);

    if (!results[0].length) {
      return {error: 1};
    }

    // check to see if the color is a valid hex color code
    if (color[0] !== "#") {
      return {error: 2};
    }

    for (let i = 1; i < color.length; i++) {
      if (color[i] !== "0" && color[i] !== "1" && color[i] !== "2" && color[i] !== "3" &&
      color[i] !== "4" && color[i] !== "5" && color[i] !== "6" && color[i] !== "7" &&
      color[i] !== "8" && color[i] !== "9" && color[i] !== "A" && color[i] !== "B" &&
      color[i] !== "C" && color[i] !== "D" && color[i] !== "E" && color[i] !== "F") {
        return {error: 2};
      }
    }

    // update the icon
    sql = "UPDATE Icons " +
    "SET typeKeyword = ?, typeName = ?, groupIndex = ?, color = ? " +
    "WHERE iconType = ?;";
    sqlArray.push(typeKeyword);
    sqlArray.push(typeName);
    sqlArray.push(groupIndex);
    sqlArray.push(color);
    sqlArray.push(iconId);

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      iconId: iconId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating icon");
    throw Error(err);
  }

}
exports.updateIcon = updateIcon;