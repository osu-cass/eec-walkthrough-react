// File: index.js
// Description: handles all API routing

const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

// catch invalid JSON request bodies
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
    if (err) {
      console.error("400: Invalid JSON request body");
      res.status(400).send({error: "400: Invalid JSON request body"});
    } else {
      next();
    }
  });
});

// general middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// handle requests
app.use("/cards", require("./cards"));
app.use("/headers", require("./headers"));
app.use("/home", require("./home"));
app.use("/icons", require("./icons"));
app.use("/items", require("./items"));
app.use("/links", require("./links"));
app.use("/pages", require("./pages"));
app.use("/users", require("./users"));

// unhandled requests get a 404 error
app.all("/*", (req, res) => {
  console.error("404: File not found\n");
  res.status(404).send({error: "Not Found"});
});

module.exports = app;