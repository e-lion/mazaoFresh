var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Mazao Fresh | Fresh Deliveries Daily'
    });
});

router.get('/about', function(req, res) {
	res.render('about');
});

router.get('/orders', function(req, res) {
	res.render('orders')
});

router.get('/sign_in', function(req, res) {
	res.render('sign_in',{
				date: new Date()
		});
});

router.get('/sign_up', function(req, res) {
	res.render('sign_up');
});

router.get('/products', function(req, res) {
	res.render('products');
});

router.get('/contacts', function(req, res) {
	res.render('contacts');
});

router.get('/home_delivery', function(req, res) {
	res.render('home_delivery');
});

module.exports = router;