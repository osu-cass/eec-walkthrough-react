// File: cards.js
// Description: handles routing for cards

const express = require('express');
const app = express.Router();

/* GET categories based on subject id.
router.get('/categories/:id', function (req, res, next) {
	console.log('4');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT *
						FROM Categories C
						WHERE SubjectID = ${id}
						ORDER BY IndexNum ASC`, function (err, row) {
		res.send(JSON.stringify(row));
	});
});

/* GET tidbits based on subject id.
router.get('/parent/:id', function (req, res, next) {
	var db = req.con;
	var id = req.params.id;
	db.query(`select TidbitID, Text, ParentID
						from (select * from Tidbits
         		order by ParentID, TidbitID) Tidbits,
        		(select @pv := ${id}) initialisation
						where find_in_set(ParentID, @pv)
						and length(@pv := concat(@pv, ',', TidbitID))`, function (err, row) {
		res.send(JSON.stringify(row));
		console.log(row);
	});
});

/* GET resource cards based on category id
router.get('/resources/:id', function (req, res, next) {
	var db = req.con;
	var id = parseInt(req.params.id);
	console.log(id);
	db.query(`SELECT *
                FROM SiteResources
                WHERE CategoryID = ${id}`, function (err, row) {
		console.log(row);
		res.send(JSON.stringify(row));
	});
});

/* GET cards based on subject id.
router.get('/:id', function (req, res, next) {
	console.log('3');
	var db = req.con;
	var id = req.params.id;
	db.query(`SELECT T.TidbitID, T.TypeID, T.Text, T.ParentID, T.IndexNum, TT.TypeName, T.CategoryID
						FROM Tidbits T
						LEFT JOIN Categories C ON C.CategoryID = T.CategoryID
						LEFT JOIN TidbitTypes TT on TT.TypeID = T.TypeID
						WHERE C.SubjectID = ${id}`, function (err, row) {
		res.send(JSON.stringify(row));
	});
});

/* CREATE New Category
router.post('/newCategory', function (req, res, next) {
	console.log('5');
	var db = req.con;
	db.query(`INSERT INTO Categories(CategoryName, SubjectID, IndexNum, CategoryTypeID)
						VALUES('${req.body.title}', ${req.body.id}, ${req.body.index}, ${req.body.categoryType})`, function (err, row) {
		if (err) throw err;
		res.send(JSON.stringify(row));
	});
});

/* CREATE Tidbit in Category
router.post('/newTidbit', function (req, res, next) {
	console.log('6');
	console.log(req.body.id, req.body.data, req.body.parent, req.body.index);
	var db = req.con;
	db.query(`INSERT INTO Tidbits(CategoryID, TypeID, Text, ParentID, IndexNum)
						VALUES(${req.body.id}, ${req.body.icon}, '${req.body.data}', ${req.body.parent}, ${req.body.index})`, function (err, row) {
		if (err) throw err;
		row.TidbitID = row.insertId;
		console.log(row);
		res.send(JSON.stringify(row));
	});
});
*/

module.exports = app;
