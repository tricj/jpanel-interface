var router = require('express').Router();

router.get('/clusters/', function(req, res, next){
    res.render('clusters/overview');
});

router.get('/clusters/create', function(req, res, next){
    res.render('clusters/create');
});

module.exports = router;