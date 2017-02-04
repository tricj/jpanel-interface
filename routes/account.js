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
    console.log(">>> serializing user");
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        console.log(">>> getting user by ID");
        done(err, user);
    });
});

router.get('/logout', authentication.isLoggedIn, function(req,res,next) {
   req.logout();
   req.flash('success_msg', 'You are now logged out');

   res.redirect('/');
});



/* POST requests */
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