var router = require('express').Router();
var clusters = require('../models/cluster');
var nodes = require('../models/node');

router.get('/', function(req, res, next){
    res.render('clusters/overview');
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

router.post('/create', function(req, res, next){
    // TODO: Validate inputs
    clusters.createCluster({
        name: req.body.name,
        description: req.body.description
    });
    res.render('clusters/create');
});

module.exports = router;