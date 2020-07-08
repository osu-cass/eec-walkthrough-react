// File: home.js
// Description: handles routing for the homepage content

const express = require("express");
const app = express();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth,
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  postPageVal,
  getPageVal,
  patchPageVal,
  searchPageVal
} = require("../services/validation/requestValidation");
const {
  getHome
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


module.exports = app;
