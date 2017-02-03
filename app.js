/*
 * Dependencies
 */
var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon'),
    logger  = require('morgan');

/*
 * Create express app instance
 */
var app = express();

/*
 * Logging configuration
 */
app.use(logger('dev'));

/*
 * Configure routes
 */
app.use('/', require('./routes/index'));
app.use('/', require('./routes/account'));
app.use('/', require('./routes/clusters'));

/*
 * Configure views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*
 * Static routes
 */
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
requireStaticModule('normalize.css');
requireStaticModule('bootstrap');
requireStaticModule('jquery');
requireStaticModule('tether');
requireStaticModule('font-awesome');
requireStaticModule('vis');

function requireStaticModule(moduleName){
    app.use(
        '/modules/' + moduleName,
        express.static(
            path.join(__dirname,
                'node_modules/' + moduleName
            )
        )
    );
    console.log("Added module: " + moduleName);
}


module.exports = app;