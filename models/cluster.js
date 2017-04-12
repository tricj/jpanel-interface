var database = require('../config/database');
var Clusters = database.Clusters;

module.exports.createCluster = function(node, callback){
    Clusters.create(node);
    console.log("created new cluster");
    // todo: callback
};

module.exports.getAllClusters = function(callback){
    Clusters.sync().then(function(){
        Clusters.findAll().then(function(clusters){
            callback(clusters);
        });
    });
};

module.exports.getClusterById = function(id, callback){
    Clusters.sync().then(function(){
        Clusters.findById(id).then(function(node){
            callback(node);
        });
    });
};