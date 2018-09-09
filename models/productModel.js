'use strict';

var mongoose = require('mongoose');

var productModel = function(){
    var productSchema = mongoose.Schema({
        title: String,
        description: String,
        seller: String,
        category: String,
        warranty: String,
        price: String,
        thumbnail: String,
        hero: String
    });
    return mongoose.model('Product', productSchema);
};

module.exports = new productModel();