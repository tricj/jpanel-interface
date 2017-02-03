var router = require('express').Router();

router.get('/account/change-password', function(req, res, next){
    res.render('account/change-password');
});

module.exports = router;