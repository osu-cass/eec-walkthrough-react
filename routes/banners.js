// File: banners.js
// Description: handles routing for banners

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getBanners,
  createBanners
} = require("../models/banners");
const {
  postBannerVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get all banners
app.get("/", async (req, res) => {

  try {
    // get all banners
    const results = await getBanners();
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// post banner data
app.post("/", requireAuth, postBannerVal.validation, async (req, res) => {

  try {
    const banners = req.body.banners;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create banners."});
      return;
    }

    // create banners
    const results = await createBanners(banners);
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;