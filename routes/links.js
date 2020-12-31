// File: links.js
// Description: handles routing for links

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  getLinks,
  updateLink,
  updateLinkTime
} = require("../models/links");
const {
  getLinkVal,
  patchLinkVal,
  patchLinkTimeVal
} = require("../services/validation/requestValidation");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// get information about all links
app.post("/all", requireAuth, getLinkVal.validation, async (req, res) => {

  try {

    console.log("Get a list of links");

    const onlyDead = req.body.onlyDead;
    const sort = req.body.sort;
    const order = req.body.order;
    const cursor = {
      primary: req.body.cursorPrimary,
      secondary: req.body.cursorSecondary
    };

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to get link data."});
      return;
    }

    // get links
    const results = await getLinks(parseInt(onlyDead, 10), parseInt(sort, 10), parseInt(order, 10), cursor);
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
    const url = req.body.url.trim();

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(5, req.auth.userId)) {
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


// update a links timestamp for last confirmed valid
app.patch("/:linkId/timestamp", requireAuth, patchLinkTimeVal.validation, async (req, res) => {

  try {

    console.log("Update a link's timestamp");

    const linkId = req.params.linkId;
    const deadLink = req.body.deadLink;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update link timestamp."});
      return;
    }

    // update a links timestamp
    const results = await updateLinkTime(linkId, deadLink);

    if (typeof results.timestamp !== "undefined") {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Link not found."});
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
