var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mazao Fresh | Fresh Deliveries Daily' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/*GET New User Page*/

router.get('/newuser', function(req, res) {
	res.render('newuser', {title: "Add New User"});
});

router.get('/orders', function(res, req) {
	res.render('orders', {title: "Orders & Deliveries"});
});

/*GET About Page*/
router.get('/about', function(req, res) {
	res.render('about', {title:"About Mazao"})
});

/*POST to Add user service*/
router.post('/adduser', function(req, res) {
	//set internal DB variable
	var db = req.db;

	//Get form values. they rely on the "name" attrib
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set our collection
	var collection = db.get('usercollection');

	collection.insert({
		"username": userName,
		"email": userEmail
	}, function (err, doc) {
		if (err) {
			res.send("There was a problem adding the in formation to the DB");
		} else {
			res.redirect("userlist");
		}
	});
});

module.exports = router;
