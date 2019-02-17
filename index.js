'use strict';

var express = require('express');
var kraken = require('kraken-js');

/**
 * this flash module has a bug
 * bug unknown and mentioned in the github issues
 * though the module is imported here 
 * all of it's usage in the app is commented out.
 *  -----------Imran Khan
 */
var flash = require('connect-flash');
/**
 * importing the connected mongodB db from mlab via the mongoose client
 */
var db = require('./lib/db');


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        db.config(config.get('databaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

// Connect Flash
app.use(flash());
app.use(function(req,res, next){
    res.locals.messages = require('express-messages')(req,res);
    next();
});

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
