var router = require('express').Router();
var User = require('../models/user');
var authentication = require('../config/passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET requests */
router.get('/change-password', authentication.isLoggedIn, function(req, res, next){
    res.render('account/change-password');
});

router.get('/login', function(req,res,next) {
    res.render('account/login');
});

passport.use(new LocalStrategy(
    function(username, password, done){
        console.log("=== Attempting login");
        User.getUserByUsername(username, function(user){
            if(!user){
                return done(null, false, {message: 'Unknown user'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            })
        })
    }
));

/* slightly tweaked from PassportJS documentation */
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.getUserById(id, function(user){
        done(null, user);
    });
});

router.get('/logout', authentication.isLoggedIn, function(req,res,next) {
   req.logout();
   res.redirect('/');
});

/* POST requests */
router.post('/change-password', authentication.isLoggedIn, function(req, res, next){
    console.log("changing password");
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;
    var confirmNewPassword = req.body.cNewPassword;

    req.checkBody('currentPassword', 'Current password is required').notEmpty();
    req.checkBody('newPassword', 'New password must between 5-30 characters long').isLength(5,30);
    req.checkBody('cNewPassword', 'Passwords do not match').equals(req.body.newPassword);

    var errors = req.validationErrors();
    var userdata = {};
    if(errors){
        userdata.errors = errors;
        res.render('account/change-password', userdata);
    } else {
        User.comparePassword(currentPassword, req.user.password, function(err, isMatch){
            if (err) throw err;
            if(isMatch){
                User.changePassword(req.user.id, newPassword, function(){
                    userdata.success_msg = 'Password successfully changed';
                    console.log(">>>>>>>>>>>>>> SUCCESSFUL PASSWORD CHANGE");
                    res.render('account/change-password', userdata);
                });
            } else {
                userdata.error_msg = "Incorrect password";
                res.render('account/change-password', userdata);
            }
        });
    }
});

router.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/account/login',
            failureFlash: true
        }),
    function(req, res, next) {
        res.redirect('/');
    }
);


module.exports = router;