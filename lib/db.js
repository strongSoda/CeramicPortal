'use strict';

var mongoose = require('mongoose');

var db = function() {
    return {
        config: function(conf) {
            mongoose.connect('mongodb://imran:1apple@ds151012.mlab.com:51012/ceramicportal');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Connection Error'));
            db.once('open', function() {
                console.log("DB Connection Open.....");
            });
        }
    }
}

module.exports = db();