module.exports.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg', 'You must login to access this area');
        res.redirect('/account/login');
    }
};