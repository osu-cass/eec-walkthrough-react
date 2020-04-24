var express = require('express');
var router = express.Router();

/* GET all subjects */
router.get('/all', function(req, res, next) {
	console.log('1');
	var db = req.con;
	db.query("SELECT * FROM Subjects",function(err, row){
		res.send(JSON.stringify(row));
	});
});

/* GET subjects based on id. */
router.get('/:id', function(req, res, next) {
	console.log('2');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT * FROM Subjects WHERE SubjectId = ${id}`,function(err, row){
		res.send(JSON.stringify(row));
	});
});

module.exports = router;
