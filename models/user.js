var database = require('../config/database');
var bcrypt      = require('bcryptjs');
var User = database.User;

module.exports.hashPassword = function(user, callback) {
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            user.password = hash;
            callback();
        })
    });
};

module.exports.createUser = function(user, callback) {
    User.hashPassword(user, function(){
        User.sync().then(function(){
            return User.create(user)
        });
    });
};

module.exports.getUserByUsername = function(username, callback) {
    User.findOne({where: { username: username}}).then(function(user){
        callback(user)
    });
};

module.exports.getUserById = function(id, callback) {
    User.findOne({where: { id: id}}).then(function(user){
        callback(user);
    });
};

module.exports.comparePassword = function(inputPassword, hash, callback){
    bcrypt.compare(inputPassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    })
};

module.exports.changePassword = function(userID, newPassword, callback) {
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newPassword, salt, function(err, hash){
            User.findOne({where: {id: userID}}).then(function(user){
                user.set("password", hash).save().then(callback());
            });
        })
    });
};

module.exports.getAllUsers = function(callback){
    User.findAll().then(function(users){
        callback(users);
    });
};

module.exports.deleteUser = function(id, callback){
    // don't allow deletion of user with ID(1). This is the super user
    if(id != 1) {
        User.destroy({
            where: {
                id: id
            }
        }).then(function (e) {
            callback(e);
        });
    } else {
        // Return a failed attempt at deleting user
        callback(0);
    }
};