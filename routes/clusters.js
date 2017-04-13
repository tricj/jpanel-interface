var router = require('express').Router();
var clusters = require('../models/cluster');
var nodes = require('../models/node');

router.get('/', function(req, res, next){
    clusters.getAllClusters(function(clusters){
        res.render('clusters/overview', {clusters: clusters});
    });
});

router.get('/create', function(req, res, next){
    res.render('clusters/create');
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
router.post('/create', function(req, res, next){
    // TODO: Validate inputs
    clusters.createCluster({
        name: req.params.name,
        description: req.params.description
    });
    res.redirect('/clusters');
});

router.post('/create-node', function(req, res, next) {
    var clusterID = req.params.clusterID;
    var name = req.params.name;
    var hostname = req.params.hostname;
    var username = req.params.username;
    var privateKey = req.params.privateKey;

    // TODO: Set to master node if no other nodes exist
});

module.exports = router;