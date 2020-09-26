// File: files.js
// Description: handles routing files

const multer = require("multer");
const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const app = express();
const {validationResult} = require("express-validator");
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");
const {
  getFiles,
  getDirectories
} = require("../models/files");
const {
  getFilesVal,
  getDirectoriesVal
} = require("../services/validation/requestValidation");


// valid image types
const imageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif"
};


// define file upload settings
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let dir;
      if (process.env.NODE_ENV === "production") {
        dir = `./client/files/uploads/user_${req.auth.userId}/`;
      } else {
        dir = `./client/public/uploads/user_${req.auth.userId}/`;
      }
      fs.exists(dir, exist => {
        if (!exist) {
          return fs.mkdir(dir, error => callback(error, dir));
        }
        return callback(null, dir);
      });
    },
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
  },
  // limit the size of a single image to approximately 6 MB
  limits: {fileSize: 6 * 1000 * 1000}
});


// confirm that the user is an editor or admin
const checkUser = async (req, res, next) => {
  if (!await roleCheck(3, req.auth.userId)) {
    res.status(401).send({error: "Unauthorized user attempting to upload file(s)."});
  } else {
    next();
  }
};


// upload a single file
app.post("/single", requireAuth, checkUser, upload.single("image"), async (req, res) => {

  try {

    console.log("Upload a file");

    if (req.file) {
      res.status(201).json({url: `/uploads/user_${req.auth.userId}/${req.file.filename}`});
    } else {
      res.status(401).send({error: "Invalid file"});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// upload multiple files
app.post("/bulk", requireAuth, checkUser, upload.array("images"), async (req, res) => {

  try {

    console.log("Upload multiple files");

    // if files are valid, return an array of image urls
    if (req.files.length) {
      const urlArray = [];
      for (let i = 0; i < req.files.length; i++) {
        urlArray.push(`/uploads/user_${req.auth.userId}/${req.files[i].filename}`);
      }

      const finalResults = {
        urls: urlArray
      };

      res.status(201).json(finalResults);
    } else {
      res.status(401).send({error: "Invalid file"});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about all of the directories
app.post("/directories", requireAuth, getDirectoriesVal.validation, async (req, res) => {

  try {

    console.log("Get file directories");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const sort = req.body.sort;
    const order = req.body.order;
    const cursor = req.body.cursor;
    console.log(sort, order, cursor);
    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to read directories."});
      return;
    }

    // get file data
    const results = await getDirectories(sort, order, cursor);

    if (results.directories) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// get information about all of files a user has uploaded
app.post("/:userId", requireAuth, getFilesVal.validation, async (req, res) => {

  try {

    const userId = req.params.userId;
    const sort = req.body.sort;
    const order = req.body.order;
    const cursor = req.body.cursor;

    console.log("Get files uploaded by user", userId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    console.log("userId", userId, "req.auth.userId", toString(req.auth.userId));
    if (userId !== req.auth.userId.toString() && !await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to read files."});
      return;
    }

    // get file data
    const results = await getFiles(userId, sort, order, cursor);

    if (results.files) {
      res.status(200).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a file
app.delete("/:userId/:fileName", requireAuth, async (req, res) => {

  try {

    const directoryId = req.params.userId.replace(/\//g, "");
    const fileName = req.params.fileName.replace(/\//g, "");

    console.log("Delete file ", fileName);

    // make sure the user is allowed to perform this action
    if (directoryId !== req.auth.userId.toString() && !await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to read files."});
      return;
    }

    // get the file path
    let path;
    if (process.env.NODE_ENV === "production") {
      path = `./client/files/uploads/user_${directoryId}/${fileName}`;
    } else {
      path = `./client/public/uploads/user_${directoryId}/${fileName}`;
    }

    // check if the file exists
    fs.exists(path, exist => {
      if (!exist) {
        return res.status(404).send({error: "File not found."});
      }

      // delete the file if it exists
      fs.unlink(path, (err) => {
        if (err) {
          return res.status(500).send({error: "An internal server error occurred. Please try again later."});
        }
        res.status(200).send({filesRemoved: 1});
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
