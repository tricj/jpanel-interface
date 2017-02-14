/*
 * Dependencies
 */
var express     = require('express'),
    session     = require('express-session'),
    eValidator  = require('express-validator'),
    path        = require('path'),
    favicon     = require('serve-favicon'),
    logger      = require('morgan'),
    Sequelize   = require('sequelize'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    bodyParser  = require('body-parser'),
    cookieParser= require('cookie-parser');

/*
 * Create express app instance
 */
var app = express();
/*
 * Configure Parsers
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*
 * Configure database
 */
var database = require('./config/database');
var Store = require('express-sequelize-session')(session.Store);

/*
 * Configure express session
 */
app.use(session({
    name: 'sid',
    secret: '20170204140147', // Random secret key
    store: new Store(database.orm),
    saveUninitialized: true,
    resave: false
}));

/*
 * Configure passport
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * Configure express validator
 * Code found at: https://github.com/ctavan/express-validator
 */
app.use(eValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

/*
 * Connect Flash to app
 */
app.use(flash());

/*
 * Configure global variables
 */
app.use(function(req,res,next) {
    // Passport errors
    res.locals.error        = req.flash('error');
    res.locals.error_msg    = req.flash('error_msg');
    res.locals.success_msg  = req.flash('success_msg');
    // User
    res.locals.user         = req.user || null;
    next();
});

/*
 * Logging configuration
 */
app.use(logger('dev'));

/**
  * TESTING DATABASE
 */

// var User = require('./models/user');
//
// var newUser = {
//     username: 'jb',
//     password: 'pass'
// };
//
// User.createUser(newUser, function(err, user){
//     if(err) throw err;
//     console.log("Callback: " + JSON.stringify(newUser));
// });

/** END OF TESTING */

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

/*
 * Configure routes
 */
app.use('/', require('./routes/index'));
app.use('/account', require('./routes/account'));
app.use('/clusters', require('./routes/clusters'));

/*
 * Configure views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


module.exports = app;