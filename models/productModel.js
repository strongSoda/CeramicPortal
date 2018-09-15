'use strict';

var mongoose = require('mongoose');

var productModel = function(){
    var productSchema = mongoose.Schema({
        title: String,
        description: String,
        seller: String,
        category: String,
        warranty: String,
        price: Number,
        thumbnail: String,
        hero: String,
        gallery1: String,
        gallery2: String,
        gallery3: String,
        gallery4: String
    });
    return mongoose.model('Product', productSchema);
};

module.exports = new productModel();