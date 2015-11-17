var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();
var User = require('../app/models/user');
var config = require('../config');


var apiRoutes = express.Router(); 

app.set('superSecret', config.secret);

//user sign up middleware?
apiRoutes.post('/register', function(req, res) {
	var user = new User({
		name: req.body.name,
		password: req.body.password
	});
	user.save(function(err) {
		if(err) throw err;
			console.log('User saved!');
			res.json({status: "success"});
	});
});



//return a random message at /api
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!'});	
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}   

		}

	});
});

//route middleware to verify a token
apiRoutes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//decode token
	if(token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token'});
			} else {
				
				//if everthing is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		
		//if no token, return error
		return res.status(403).send({
			success: false,
			message: 'No token Provided'
		});
	}
});


//return all users
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

//apply /api to our app
router.use('/', apiRoutes);

module.exports = router;