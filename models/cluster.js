var database = require('../config/database');
var Clusters = database.Clusters;

module.exports.createCluster = function(node, callback){
    Clusters.create(node).then(function(r){
        callback(true);
    }).catch(function(){
        callback(false);
    })
};

module.exports.deleteCluster = function(id, callback){
    Clusters.destroy({
        where: {
            id: id
        }
    }).then(function(e){
        callback(e);
    }).catch(function(e){
        callback(e);
    });
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