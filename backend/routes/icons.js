// File: icons.js
// Description: handles routing for icons

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getIcons,
  updateIcon,
  createIcon
} = require("../models/icons");
const {
  patchIconVal,
  postIconVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get information about all icons
app.get("/all", async (req, res) => {

  try {

    console.log("Get a list of all icons");

    // get all icons
    const results = await getIcons();

    if (results.icons.length === 0) {
      res.status(404).send({error: "No icons found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create an icon
app.post("/", requireAuth, postIconVal.validation, async (req, res) => {

  try {

    console.log("Create an icon");

    const typeKeyword = req.body.typeKeyword.trim();
    const typeName = req.body.typeName.trim();
    const groupIndex = req.body.groupIndex;
    const color = req.body.color.trim();

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create icon."});
      return;
    }

    // create an icon
    const results = await createIcon(typeKeyword, typeName, groupIndex, color);

    if (results.insertId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Invalid hex color code."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update an icon
app.patch("/:iconId", requireAuth, patchIconVal.validation, async (req, res) => {

  try {

    console.log("Update an icon");

    const iconId = req.params.iconId;
    const typeKeyword = req.body.typeKeyword;
    const typeName = req.body.typeName;
    const groupIndex = req.body.groupIndex;
    const color = req.body.color;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update icon."});
      return;
    }

    // update an icon
    const results = await updateIcon(iconId, typeKeyword, typeName, groupIndex, color);

    if (results.iconId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Icon not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Invalid hex color code."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
