var router = require('express').Router();
var authentication = require('../config/passport');
var cluster = require('../models/cluster');
var node = require('../models/node');

router.get('/cloud-store', authentication.requireLogin, function(req, res, next) {
    var clusterID = req.session.activeCluster;

    var ssh = require('../config/ssh');

    cluster.getClusterById(clusterID, function(cluster){
        node.getNodeById(cluster.masterNode, function(node){
            ssh.connect({
                host: node.hostname,
                username: node.username,
                privateKey: node.privateKey
            }).then(function(){
                ssh.execCommand('ls -alp', { cwd:'~' }).then(function(result) {
                    res.render('file-manager/cloud-store', { result: result.stdout });
                });
            }, function(e){
                res.json({
                    success: false,
                    msg: "Could not connect to master node of cluster " + cluster.name
                })
            });
        });
    });
});

module.exports = router;