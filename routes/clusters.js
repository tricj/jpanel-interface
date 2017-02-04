var router = require('express').Router();

router.get('/', function(req, res, next){
    res.render('clusters/overview');
});

router.get('/create', function(req, res, next){
    res.render('clusters/create');
});

module.exports = router;