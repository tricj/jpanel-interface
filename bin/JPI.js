#!/usr/bin/env node

/**
 * Dependencies
 */
var express = require('express'),
    app     = require('../app');

var http  = require('http'),
    https = require('https');

var fs       = require('fs'),
    path        = require('path');

/**
 * HTTPS Server
 */
const options = {
    cert: fs.readFileSync(path.join(__dirname, '../ssl', 'jpanel_jamie-bell_me.crt')),
    key: fs.readFileSync(path.join(__dirname, '../ssl', 'jpanel_jamie-bell_me.key'))
};
var server = https.createServer(options, app);

/**
 * Network listener
 */
server.listen(443);

/**
 * HTTP auto-redirect
 */
// TODO: Optional HTTP listener - Disable if using load balancer to handle this
http.createServer(function(req, res){
    res.writeHead(301, {
        Location: "https://"
        + req.headers.host
        + ""
        + req.url
    });
    res.end();
}).listen(80);