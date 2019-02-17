'use strict';

// require the product model
var Product = require('../models/productModel');


module.exports = function (router) {

    // when request comes for home route fetch products from dB
    router.get('/', function (req, res) {
      Product.find({}, function(err, products){
          if(err) {
              console.log(err); 
          }

          var model = {
              products: products
          }
        //   render the index.dust file & pass the model to it.
          res.render('index', model);
      });     
        
    });

};
