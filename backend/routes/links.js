// File: links.js
// Description: handles routing for links

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getLinks,
  updateLink
} = require("../models/links");
const {
  getLinkVal,
  patchLinkVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get information about all links
app.get("/all/:onlyDead", requireAuth, getLinkVal.validation, async (req, res) => {

  try {

    console.log("Get a list of links");

    const onlyDead = req.params.onlyDead;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get link data."});
      return;
    }

    // get links
    const results = await getLinks(parseInt(onlyDead, 10));
    res.status(200).send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// change a published links url
app.patch("/:linkId", requireAuth, patchLinkVal.validation, async (req, res) => {

  try {

    console.log("Update a link");

    const linkId = req.params.linkId;
    const url = req.body.url;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to patch link data."});
      return;
    }

    // update the link
    const results = await updateLink(linkId, url);

    if (results.linkId > 0) {
      res.status(200).send(results);
    } else {
      res.status(404).send({error: "No links found."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
