var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/', function(req, res, next){
  res.render('dashboard');
});

module.exports = router;