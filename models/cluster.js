var database = require('../config/database');
var Clusters = database.Clusters;
var Nodes = database.Nodes;

module.exports.createCluster = function(node, callback){
    Clusters.create(node).then(function(r){
        callback(true);
    }).catch(function(){
        callback(false);
    })
};

module.exports.update = function(id, name, description, callback){
    Clusters.update({
        name: name,
        description: description
    }, {
        where: {
            id: id
        }
    }).then(function(numRows){
        if(numRows != 1){
            return callback(false);
        } else {
            return callback(true);
        }
    });
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

module.exports.setMasterNode = function(clusterId, nodeId, callback){
    Clusters.update({masterNode: nodeId}, {where: {id: clusterId}}).then(function(numRows){
        if(numRows != 1){
            console.log('Error attempting to set master node'); // TODO: Log more information on what went wrong
            return callback();
        }
        Nodes.update({isMaster: 0}, {where: {clusterId: clusterId, isMaster: 1}});
        Nodes.update({isMaster: 1}, {where: {id: nodeId}}).then(function(numRows){
            if(numRows != 1){
                console.log('Error attempting to flag node as master'); // TODO: Log more about this error
            }
            return callback();
        })
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