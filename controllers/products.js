'use strict';

var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
    router.get('/',function(req,res){
        res.render('index');
    });

    router.get('/details/:id',function(req,res){
        Product.findOne({_id: req.params.id}, function(err, product){
            if(err) {
                console.log(err);
            }
            var model = {
                product: product
            }
            res.render('products/details', model);
        });
        
    });
}
