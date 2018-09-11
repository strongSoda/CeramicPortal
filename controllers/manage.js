'use strict';

var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
    router.get('/',function(req,res){
        res.render('manage/index');
    });

    router.get('/products',function(req,res){
        Product.find({}, function(err, products){
            if(err) {
                console.log(err); 
            }
  
            var model = {
                products: products
            }
  
            res.render('manage/products/index', model);
        });     
    });

    router.get('/products/add',function(req,res){
        Category.find({},function(err,categories){
            if(err) {
                console.log(err);
            }
            var model = {
                categories: categories
            }

            res.render('manage/products/add', model);
        });

    });

    router.post('/products' , function(req,res) {
        var title = req.body.title && req.body.title.trim();
        var description = req.body.description && req.body.description.trim();
        var seller = req.body.seller && req.body.seller.trim();
        var category = req.body.category && req.body.category.trim();
        var price = req.body.price && req.body.price.trim();
        var thumbnail = req.body.thumbnail && req.body.thumbnail.trim();
        var hero = req.body.hero && req.body.hero.trim();
        var warranty = req.body.warranty && req.body.warranty.trim();

        if(title == '' || price == '' || seller == '' || hero == '' || thumbnail == '' ) {
            req.flash('error', "Please fill out the required fields");
            res.location('/manage/products/add');
            res.redirect('/manage/products/add');
        }

        var newProduct = new Product({
            title: title,
            category: category,
            description: description,
            warranty: warranty,
            seller: seller,
            price: price,
            hero: hero,
            thumbnail: thumbnail
        });

        newProduct.save(function(err) {
            if(err) {
                console.log('save error', err);
            }

            req.flash('success',"Product Added");
            res.location('/manage/products');
            res.redirect('/manage/products');
        })
    });

    router.get('/products/edit/:id', function(req,res) {
        Category.find({}, function( err, categories){
            Product.findOne({_id: req.params.id}, function(err, product) {
                if(err) {
                    console.log(err);
                }
    
                var model = {
                    product: product,
                    categories: categories
                };
    
                res.render('manage/products/edit', model);

            });            
        });
    });

    router.get('/categories',function(req,res){
        res.render('manage/categories/index');
    });
}
