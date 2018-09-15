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
        var thumbnail = req.body.thumbnail ;//&& req.body.thumbnail.trim()
        var hero = req.body.hero && req.body.hero.trim();
        var warranty = req.body.warranty && req.body.warranty.trim();
        var gallery1 = req.body.gallery1 && req.body.gallery1.trim();
        var gallery2 = req.body.gallery2 && req.body.gallery2.trim();
        var gallery3 = req.body.gallery3 && req.body.gallery3.trim();
        var gallery4 = req.body.gallery4 && req.body.gallery4.trim();

        if(title == '' || price == '' || seller == '' || hero == '' || thumbnail == '' ) {
            // req.flash('error', "Please fill out the required fields");
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
            thumbnail: thumbnail,
            gallery1: gallery1,
            gallery2: gallery2,
            gallery3: gallery3,
            gallery4: gallery4
        });

        newProduct.save(function(err) {
            if(err) {
                console.log('save error', err);
            }

            // req.flash('success',"Product Added");
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

    router.post('/products/edit/:id' , function(req,res) {
        var title = req.body.title && req.body.title.trim();
        var description = req.body.description && req.body.description.trim();
        var seller = req.body.seller && req.body.seller.trim();
        var category = req.body.category && req.body.category.trim();
        var price = req.body.price && req.body.price.trim();
        var thumbnail = req.body.thumbnail && req.body.thumbnail.trim() ;
        var hero = req.body.hero && req.body.hero.trim();
        var warranty = req.body.warranty && req.body.warranty.trim();

        if(title == '' || price == '' || seller == '' || hero == '' || thumbnail == '' ) {
            // req.flash('error', "Please fill out the required fields");
            res.location('/manage/products/edit');
            res.redirect('/manage/products/edit');
        }

        Product.update({_id: req.params.id}, {

            title: title,
            category: category,
            seller: seller,
            warranty: warranty,
            price: price,
            description: description,
            hero: hero,
            thumbnail: thumbnail
        }, function(err){
            if(err) {
            console.log("update error" , err);
            }
            // req.flash('success',"Product Updated");
            res.location('/manage/products');
            res.redirect('/manage/products');
         
        });
    });

    router.post('/products/delete/:id', function(req,res){
        Product.remove({_id: req.params.id}, function(err){
            if(err){
                console.log(err);
            }
            // req.flash('success', "Product Deleted");
            res.location('/manage/products');
            res.redirect('/manage/products');
        })
    })

    router.get('/categories',function(req,res){
        res.render('manage/categories/index');
    });
}
