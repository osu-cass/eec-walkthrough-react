// File: items.js
// Description: handles routing for items

const express = require('express');
const app = express.Router();

/* GET all tidbit types. 
router.get('/types', function (req, res, next) {
  console.log('1');
  var db = req.con;
  db.query("SELECT * FROM TidbitTypes ORDER BY TypeKeyword ASC", function (err, row) {
    res.send(JSON.stringify(row));
  });
});
*/

module.exports = app;
