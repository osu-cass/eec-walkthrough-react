var express = require('express');
var router = express.Router();

/* GET cards based on subject id. */
router.get('/:id', function(req, res, next) {
	console.log('3');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT T.TidbitID, T.TypeID, TT.TypeName, T.Text, T.ParentID, T.IndexNum FROM Tidbits T LEFT JOIN TidbitTypes TT ON TT.TypeID = T.TypeID WHERE SubjectId = ${id}`,function(err, row){
		res.send(JSON.stringify(row));
	});
});
module.exports = router;
