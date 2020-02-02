var express = require('express');
var router = express.Router();

/* GET cards based on subject id. */
router.get('/types/:id', function(req, res, next) {
	console.log('4');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT * FROM TidbitTypes WHERE SubjectID = ${id}`,function(err, row){
		res.send(JSON.stringify(row));
	});
});

/* GET cards based on subject id. */
router.get('/parent/:id', function(req, res, next) {
	var db = req.con;
	var id = req.params.id;
	console.log(`process 5 with id ${id}`);
	db.query(`select TidbitID, Text, ParentID 
						from (select * from Tidbits
         		order by ParentID, TidbitID) Tidbits,
        		(select @pv := ${id}) initialisation
						where find_in_set(ParentID, @pv)
						and length(@pv := concat(@pv, ',', TidbitID))`,function(err, row){
		res.send(JSON.stringify(row));
		console.log(row);
	});
});

/* GET cards based on subject id. */
router.get('/:id', function(req, res, next) {
	console.log('3');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT T.TidbitID, T.TypeID, TT.TypeName, T.Text, T.ParentID, T.IndexNum 
						FROM Tidbits T LEFT JOIN TidbitTypes TT ON TT.TypeID = T.TypeID 
						WHERE TT.SubjectId = ${id}`,function(err, row){
		res.send(JSON.stringify(row));
	});
});
module.exports = router;
