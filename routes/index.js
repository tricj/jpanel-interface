var router = require('express').Router();
var authentication = require('../config/passport');

router.get('/', authentication.isLoggedIn, function(req, res, next) {
    res.render('dashboard');
});

module.exports = router;