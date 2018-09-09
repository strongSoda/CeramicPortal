'use strict';

var Product = require('../models/productModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
      Product.find({}, function(err, products){
          if(err) {
              console.log(err); 
          }

          var model = {
              products: products
          }

          res.render('index', model);
      });     
        
    });

};
