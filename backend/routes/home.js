// File: home.js
// Description: handles routing for the homepage content

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth
} = require("../services/authentication/cookieAuth");
const {
  patchHomeVal,
  patchSponsorsVal
} = require("../services/validation/requestValidation");
const {
  getHome,
  updateHome,
  getSponsors,
  updateSponsors
} = require("../models/home");


// get homepage content
app.get("/", async (req, res) => {

  try {

    console.log("Get homepage content");

    const results = await getHome();
    if (results.homeId) {
      res.status(200).send(results);
    } else {
      res.status(404).send({error: "Page not found."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update the homepage
app.patch("/", requireAuth, patchHomeVal.validation, async (req, res) => {

  try {

    console.log("Update the homepage");

    const mainHeader = req.body.mainHeader;
    const secondaryHeader = req.body.secondaryHeader;
    const sectionsTitle = req.body.sectionsTitle;
    const sectionsFooter = req.body.sectionsFooter;
    const tidbitsHeader = req.body.tidbitsHeader;
    const tidbitsTitle = req.body.tidbitsTitle;
    const tidbitsFooter = req.body.tidbitsFooter;
    const linksHeader = req.body.linksHeader;
    const linksTitlePrefix = req.body.linksTitlePrefix;
    const linksTitlePostfixInternal = req.body.linksTitlePostfixInternal;
    const linksTitlePostfixDownload = req.body.linksTitlePostfixDownload;
    const linksFooter = req.body.linksFooter;
    const disclaimerHeader = req.body.disclaimerHeader;
    const disclaimerText = req.body.disclaimerText;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update homepage."});
      return;
    }

    // update a page
    const results = await updateHome(mainHeader, secondaryHeader, sectionsTitle,
      sectionsFooter, tidbitsHeader, tidbitsTitle, tidbitsFooter, linksHeader,
      linksTitlePrefix, linksTitlePostfixInternal, linksTitlePostfixDownload,
      linksFooter, disclaimerHeader, disclaimerText);

    if (results.homePageUpdated) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get the list of sponsors for the homepage
app.get("/sponsors", async (req, res) => {

  try {

    console.log("Get homepage sponsors");

    const results = await getSponsors();
    if (results.sponsorId) {
      res.status(200).send(results);
    } else {
      res.status(404).send({error: "No sponsors found."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update the list of sponsors that are shown on the homepage
app.patch("/sponsors", requireAuth, patchSponsorsVal.validation, async (req, res) => {

  try {

    console.log("Update homepage sponsors");

    const sponsors = req.body.sponsors;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update sponsors."});
      return;
    }

    // update sponsors
    const results = await updateSponsors(sponsors);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
