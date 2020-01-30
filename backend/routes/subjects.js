var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var db = req.con;
	db.query("SELECT * FROM Subjects",function(err, row){
		res.send(JSON.stringify(row));
	});
});

module.exports = router;
