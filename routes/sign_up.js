var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

router.get('/', function(req, res) {
	res.render('sign_up')
})

/*router.get('/', function(req, res) {
	var lion = new User({
		name: '',
		password: '',
		admin: true
	});

	lion.save(function(err) {
		if (err) throw err;

		console.log('User save Successfully!');
		res.json({ success: true });
	});
});*/

module.exports = router;