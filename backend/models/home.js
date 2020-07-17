// File: home.js
// Description: Provides functions for working with homepage data.

const {pool} = require("../services/database/mysqlPool");


// return information about the homepage content
async function getHome(viewAll) {

  try {

    let sql = "SELECT * FROM Home;";
    let results = await pool.query(sql, []);

    // check to see if we were able to find the content
    if (!results[0].length) {
      return {homeId: 0};
    }

    const finalResults = results[0][0];
    finalResults.homeId = 1;

    // get all of the different page categories based on the users role
    if (viewAll) {
      sql = "SELECT * FROM Categories ORDER BY pluralName ASC;";
    } else {
      sql = "SELECT * FROM Categories WHERE internal = 0 ORDER BY pluralName ASC;";
    }
    results = await pool.query(sql, []);

    finalResults.categories = results[0];

    return finalResults;

  } catch (err) {
    console.error("Error searching for homepage data");
    throw Error(err);
  }

}
exports.getHome = getHome;


// return information about the sponsors on the homepage
async function getSponsors() {

  try {

    const sql = "SELECT * FROM Sponsors;";
    const results = await pool.query(sql, []);

    // check to see if we were able to find the content
    if (!results[0].length) {
      return {sponsorId: 0};
    }

    const finalResults = results[0];
    finalResults.sponsorId = 1;

    return finalResults;

  } catch (err) {
    console.error("Error searching for sponsor data");
    throw Error(err);
  }

}
exports.getSponsors = getSponsors;


// update the homepage
async function updateHome(mainHeader, secondaryHeader, sectionsTitle, sectionsFooter,
  tidbitsHeader, tidbitsTitle, tidbitsFooter, linksHeader, linksTitlePrefix,
  linksTitlePostfixInternal, linksTitlePostfixDownload, linksFooter,
  disclaimerHeader, disclaimerText) {

  try {

    const sql = "UPDATE Home " +
    "SET mainHeader = ?, secondaryHeader = ?, sectionsTitle = ?, sectionsFooter = ?, " +
    "tidbitsHeader = ?, tidbitsTitle = ?, tidbitsFooter = ?, linksHeader = ?, linksTitlePrefix = ?, " +
    "linksTitlePostfixInternal = ?, linksTitlePostfixDownload = ?, linksFooter = ?, " +
    "disclaimerHeader = ?, disclaimerText = ?;";

    const sqlArray = [mainHeader, secondaryHeader, sectionsTitle, sectionsFooter,
      tidbitsHeader, tidbitsTitle, tidbitsFooter, linksHeader, linksTitlePrefix,
      linksTitlePostfixInternal, linksTitlePostfixDownload, linksFooter,
      disclaimerHeader, disclaimerText];

    await pool.query(sql, sqlArray);

    const finalResults = {
      homePageUpdated: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating homepage");
    throw Error(err);
  }

}
exports.updateHome = updateHome;


// update sponsors on the homepage
async function updateSponsors(sponsors) {

  try {

    // delete the old sponsors
    let sql = "DELETE FROM Sponsors;";
    await pool.query(sql, []);

    // insert the new sponsors
    for (let i = 0; i < sponsors.length; i++) {
      sql = "INSERT INTO Sponsors " +
        "(name, title, websiteUrl, imageUrl, orderIndex) " +
        "VALUES (?, ?, ?, ?, ?);";

      const sqlArray = [sponsors[i].name, sponsors[i].title,
        sponsors[i].websiteUrl, sponsors[i].imageUrl, sponsors[i].orderIndex]
      
      await pool.query(sql, sqlArray);
    }

    const finalResults = {
      sponsorsUpdated: sponsors.length
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating sponsors");
    throw Error(err);
  }

}
exports.updateSponsors = updateSponsors;