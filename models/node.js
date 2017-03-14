var database = require('../config/database');
var Nodes = database.Nodes;

module.exports.createNode = function(node, callback){
    Nodes.create(node);
    // todo: callback
};

module.exports.getNodeById = function(id, callback){
    Nodes.findById(id).then(function(node){
        callback(node);
    });
};

module.exports.getNodesByCluster = function(clusterId, callback){
    Nodes.find({where: { clusterId: clusterId}}).then(function(nodes){
        callback(nodes);
    });
};