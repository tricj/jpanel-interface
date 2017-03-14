var router = require('express').Router();
var authentication = require('../config/passport');

router.get('/', authentication.requireLogin, function(req, res, next) {
    res.render('dashboard');
});

module.exports = router;