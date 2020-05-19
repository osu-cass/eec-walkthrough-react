// File: users.js
// Description: handles routing for users

const express = require('express');
const {validationResult} = require('express-validator');
const app = express();
const {
  getUser,
  loginUser,
  createUser
} = require('../models/users');
const {postUser} = require('../services/validation/schemaValidation');

// get information about a single user
app.get("/:userId", async (req, res) => {

  try {

    const userId = req.params.userId;
    console.log("Get user", userId);

    // get user data
    const results = await getUser(userId);

    if (results.userId === 0) {
      res.status(404).send({error: "User not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// login a user
app.get("/login/:userName/:password", async (req, res) => {

  try {

    const userName = req.params.userName;
    const password = req.params.password;
    console.log("Check login for", userName);

    // get user data
    const results = await loginUser(userName, password);

    if (results.userId === 0) {
      res.status(400).send({error: "Username or password is incorrect."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a user
app.post("/", postUser.validation, async (req, res) => {

  try {

    // confirm that the request body has a valid user
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }

    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log("Create a new user");

    // create a user
    const results = await createUser(userName, password, firstName, lastName, email);

    if (results.insertId) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(400).send({error: "A user with that username already exists."});
      } else if (results.error === 2) {
        res.status(400).send({error: "A user with that email already exists."});
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
