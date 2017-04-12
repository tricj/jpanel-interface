var router = require('express').Router();
var User = require('../models/user');
var authentication = require('../config/passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var sanitizer = require('sanitizer');
var validator = require('express-validator');

/* GET requests */
router.get('/change-password', authentication.requireLogin, function(req, res, next){
    res.render('account/change-password');
});

router.get('/login', function(req,res,next) {
    res.render('account/login');
});

router.get('/manage-users', authentication.requireLogin, function(req, res, next) {
    User.getAllUsers(function(users){
        res.render('account/manage-users', {users: users});
        // TODO: Only return appropriate information - no password!
    });
});

/* DELETE requests */
router.delete('/delete-user/:id', authentication.requireLogin, function(req, res, next) {
    // TODO: Permissions
    // TODO: Logging

    req.checkParams('id', 'ID is not numeric').isNumeric();
    var id = req.params.id;

    req.getValidationResult().then(function(result){
       if(!result.isEmpty()){
           // Validation error(s) occured
           res.json({
               success: false,
               msg: "Failed to delete user. Reason: Validation attempt failed"
           });
           return;
       }
        User.deleteUser(id, function(success){
            if(success){
                // User has been deleted
                res.json({
                    success: true,
                    msg: "Successfully deleted user"
                });
            } else {
                res.json({
                    success: false,
                    msg: "Failed to delete user. Reason: No user found"
                });
            }
        });

    });
});

passport.use(new LocalStrategy(
    function(username, password, done){
        console.log("=== Attempting login");
        User.getUserByUsername(username, function(user){
            if(!user){
                return done(null, false, {"message": 'Unknown user'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {"message": 'Invalid password'});
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

router.get('/logout', authentication.requireLogin, function(req, res, next) {
   req.logout();
   res.redirect('/');
});

/* POST requests */
router.post('/create-user', authentication.requireLogin, function(req,res,next){
    console.log("created new user");
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    // TODO: Check validation

    User.createUser({
        username: username,
        password: password
    });
});

router.post('/change-password', authentication.requireLogin, function(req, res, next){
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