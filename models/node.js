var database = require('../config/database');
var Nodes = database.Nodes;
var clusters = require('./cluster');

module.exports.createNode = function(node, callback){
    Nodes.create(node).then(function(r){
        var node = r.dataValues;
        clusters.getClusterById(node.clusterId, function(cluster){
            callback(true, cluster.dataValues, node);
        });
    }).catch(function(){
        callback(false);
    });
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


module.exports.deleteNodeById = function(id, callback){
    Nodes.destroy({
        where: {
            id: id
        }
    }).then(function(e){
        callback(e);
    }).catch(function(e){
        callback(e);
    });
};

module.exports.deleteNodeByClusterId = function(id, callback){
    Nodes.destroy({
        where: {
            clusterId: id
        }
    }).then(function(e){
        callback(e);
    }).catch(function(e){
        callback(e);
    })
};

/**
 * Check if master flag is set
 * @param node
 * @returns {boolean} true if flag is set, otherwise false
 */
module.exports.isMaster = function(node){
    return node.isMaster;
};