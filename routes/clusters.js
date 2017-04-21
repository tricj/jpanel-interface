var router = require('express').Router();
var clusters = require('../models/cluster');
var nodes = require('../models/node');

router.get('/', function(req, res, next){
    clusters.getAllClusters(function(clusters){
        res.render('clusters/overview', {clusters: clusters});
    });
});

router.get('/view/:id', function(req, res, next){
    var id = req.params.id;
    clusters.getClusterById(id, function(c){
        if(c != null) {
            nodes.getNodesByCluster(c.id, function (nodes) {
                res.render('clusters/detailed-view', {cluster: c, nodes: nodes});
            });
        } else {
            res.status(404);
            res.send("Cluster not found");
        }
    });
});

/*
 * POST requests
 */
router.post('/create-cluster', function(req, res, next) {
    req.checkBody({
        'name': {
            isLength: {
                options: [{
                    min: 2,
                    max: 64
                }],
                errorMessage: 'Name must be between 2 and 64 characters'
            }
        },
        'description': {
            optional: true,
            isLength: {
                options: [{
                    min: 0,
                    max: 256
                }],
                errorMessage: 'Description must be less than 256 characters'
            }
        }
    });

    req.getValidationResult().then(function(result){
        if(result.isEmpty()){
            // No errors
            // TODO: Log to database
            console.log("Creating cluster: {name:\"" + req.body.name + "\", description: \"" + req.body.description + "\"}");
            clusters.createCluster({
                name: req.body.name,
                description: req.body.description
            }, function(success){
                if(success){
                    // Created cluster
                    res.json({
                        success: true,
                        msg: 'Created cluster successfully'
                    })
                } else {
                    // An error occured
                    res.json({
                        success: false,
                        msg: 'Failed to create cluster, please try again'
                    })
                }
            });
        } else {
            // Error(s) occurred
            res.json({
                success: false,
                errors: result
            });
            return;
        }
    });
});

router.post('/create-node', function(req, res, next) {
    var clusterID = req.body.clusterID;
    var name = req.body.name;
    var hostname = req.body.hostname;
    var username = req.body.username;
    var privateKey = req.body.privateKey;

    // TODO: Improve validation rules

    req.checkBody({
        'clusterID': {
            isInt: {
                errorMessage: 'Cluster ID not set correctly'
            }
        },
        'hostname': {
            isLength: {
                options: [{
                    min: 2,
                    max: 256
                }],
                errorMessage: 'Hostname not set correctly'
            }
        },
        'username': {
            isLength: {
                options: [{
                    min: 1,
                    max: 256
                }],
                errorMessage: 'Username not set'
            }
        }
    });

    req.getValidationResult().then(function(result){
        // TODO: Save private key to file and set privateKey to path of file in database
        if(result.isEmpty()){
            // no errors
            nodes.createNode({
                clusterId: clusterID,
                name: name,
                username: username,
                hostname: hostname,
                privateKey: privateKey
            }, function(success, cluster, node){
                if(success){
                    if(cluster.masterNode == null){
                        clusters.setMasterNode(cluster.id, node.id, function(){
                            console.log("Set node as master");
                        });
                    }
                    // Created cluster
                    res.json({
                        success: true,
                        msg: 'Created cluster successfully'
                    })
                } else {
                    // An error occured
                    res.json({
                        success: false,
                        msg: 'Failed to create cluster, please try again'
                    })
                }
            });
        } else {
            console.log("Error creating node - validation failed");
            res.json({
                success: 'false',
                msg: result
            });
            return;
        }
    });
});

/*
 * DELETE requests
 */
router.delete('/delete-cluster/:id', function(req, res, next) {
    req.checkParams({
        'id': {
            notEmpty: true,
            isInt: true,
            errorMessage: 'Invalid ID'
        }
    });

    req.getValidationResult().then(function(result){
        if(result.isEmpty()){
            // No errors
            clusters.deleteCluster(req.params.id, function(e){
                console.log("Deleting cluster: " + e);
                if(e){
                    // Success deleting cluster
                    // Cascade delete any nodes with the associated clusterID
                    nodes.deleteNodeByClusterId(req.params.id, function(e){
                        if(e){
                            res.json({
                                success: true,
                                msg: 'Successfully deleted cluster'
                            });
                        } else {
                            res.json({
                                success: true,
                                msg: 'Successfully deleted cluster - error deleting associated nodes'
                            })
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'Error deleting cluster, please try again'
                    });
                }
            })
        } else {
            // Error(s) occurred
            res.json({
                success: false,
                errors: result
            });
            return;
        }
    });
});
router.delete('/delete-node/:id', function(req, res, next) {
    // TODO: Remove master node flag if applicable
    req.checkParams({
        'id': {
            notEmpty: true,
            isInt: true,
            errorMessage: 'Invalid ID'
        }
    });
    req.getValidationResult().then(function(result){
        if(result.isEmpty()){
            nodes.deleteNodeById(req.params.id, function(e){
                if(e){
                    res.json({
                        success: true,
                        msg: 'Successfully deleted node'
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'Error deleting node'
                    });
                }
            });
        } else {
            // Error(s) occurred
            res.json({
                success: false,
                errors: result
            });
            return;
        }
    });
});

module.exports = router;