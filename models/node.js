var database = require('../config/database');
var Nodes = database.Nodes;

module.exports.createNode = function(node, callback){
    Nodes.create(node);
    // todo: callback
};

module.exports.getNodeById = function(id, callback){
    Nodes.sync().then(function(){
        Nodes.findById(id).then(function(node){
            callback(node);
        });
    });
};

module.exports.getNodesByCluster = function(clusterId, callback){
    Nodes.sync().then(function(){
        Nodes.findAll({where: { clusterId: clusterId}}).then(function(nodes){
            callback(nodes);
        });
    });
};

/**
 * Check if master flag is set
 * @param node
 * @returns {boolean} true if flag is set, otherwise false
 */
module.exports.isMaster = function(node){
    return node.isMaster;
};