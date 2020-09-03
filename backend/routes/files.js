// File: files.js
// Description: handles routing files

const multer = require("multer");
const express = require("express");
const crypto = require("crypto");
const app = express();
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");


// valid image types
const imageTypes = {
  "image/jpeg": "jpg",
  "image/png" : "png",
  "image/gif" : "gif"
};


// define file upload settings
const upload = multer({
  storage: multer.diskStorage({
    destination: "../frontend/public/uploads/",
    filename: (req, file, callback) => {
      // store image files with the correct extension.
      const basename = crypto.pseudoRandomBytes(16).toString("hex");
      const extension = imageTypes[file.mimetype];
      callback(null, `${basename}.${extension}`);
    }
  }),
  // rejects non jpg or png files
  fileFilter: (req, file, callback) => {
    callback(null, !!imageTypes[file.mimetype]);
  }
});


// confirm that the user is a editor or admin
const checkUser = async (req, res, next) => {
  if (!await roleCheck(3, req.auth.userId)) {
    res.status(401).send({error: "Unauthorized user attempting to upload a file."});
  } else {
    next();
  }
};


// upload a single file
app.post('/single', requireAuth, checkUser, upload.single("image"), async (req, res) => {

  try {

    console.log("Upload a file");

    if (req.file) {
      res.status(201).json({url: `/uploads/${req.file.filename}`});
    } else {
      res.status(401).send({error: "Invalid file"});
    }

  } catch(err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
