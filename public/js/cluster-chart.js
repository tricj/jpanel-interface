$(function(){
    var clusterCanvas = document.getElementById('clusterChart');

    var nodes = new vis.DataSet([
        {id: 1, label: 'Cluster Name1'},
        {id: 2, label: 'Node A'},
        {id: 3, label: 'Node B'},
        {id: 4, label: 'Cluster Name2'},
        {id: 5, label: 'Node C'},
        {id: 6, label: 'Node D'},
        {id: 7, label: 'Node E'}
    ]);

    var edges = new vis.DataSet([
        {from: 1, to: 2},
        {from: 1, to: 3},

        {from: 4, to: 5},
        {from: 4, to: 6},
        {from: 4, to: 7}
    ]);

    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};

    var network = new vis.Network(clusterCanvas, data, options);


});