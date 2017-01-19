#!/usr/bin/env node

/**
 * Dependencies
 */
var app     = require('../app');
//var debug   = require('debug', 'jpi');
var http    = require('http');

/**
 * Port configuration
 */
var port    = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * HTTP Server
 */
var server  = http.createServer(app);

/**
 * Network listeners
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize port function
 */
function normalizePort(v)
{
    var port = parseInt(v, 10);

    if (isNaN(port))
    {
        // named pipe
        return v;
    }

    if (port >= 0)
    {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP errors
 */
function onError(e)
{
    if (e.syscall !== 'listen')
    {
        throw e;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific errors
    switch(e.code)
    {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use by another process');
            process.exit(1);
            break;
        default:
            throw e;

    }
}

/**
 * Event listener for HTTP port listening
 */
function onListening()
{
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}