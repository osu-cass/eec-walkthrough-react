var express = require('express');
var router = express.Router();

/* GET figures based on subject id. */
router.get('/:id', function(req, res, next) {
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT * FROM Figures WHERE SubjectId = ${id}`,function(err, row){
		res.send(JSON.stringify(row));
	});
});

module.exports = router;
