// File: users.js
// Description: handles routing for users

const express = require('express');
const app = express();
const {
  getUser,
  loginUser
} = require('../models/users');


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
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
