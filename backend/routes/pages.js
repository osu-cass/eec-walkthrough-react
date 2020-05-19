// File: pages.js
// Description: handles routing for pages

const express = require('express');
const app = express();
const {
  getPage,
  getIndustries,
  getFullPage
} = require('../models/pages');


// get information about a single page
app.get("/:pageId", async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get page", pageId);

    // get page data
    const results = await getPage(pageId);

    if (results.pageId === 0) {
      res.status(404).send({error: "Page not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about industries and their related subjects
app.get("/industries/all", async (req, res) => {

  try {

    console.log("Get a list of all industries and their related subjects");

    // get a list of industries and their subjects
    const results = await getIndustries();

    if (results.industries.length === 0) {
      res.status(404).send({error: "No industries found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get all of the page info, headers, cards, and items for a single page
app.get("/:pageId/all", async (req, res) => {

  try {

    const pageId = req.params.pageId;
    console.log("Get all data related to page", pageId);

    // get complete page data
    const results = await getFullPage(pageId);

    if (results.pageId === 0) {
      res.status(404).send({error: "Page not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
