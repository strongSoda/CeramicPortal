'use strict';

module.exports = function(router){
    router.get('/',function(req,res){
        res.render('manage/index');
    });

    router.get('/products',function(req,res){
        res.render('manage/products/index');
    });
    router.get('/categories',function(req,res){
        res.render('manage/categories/index');
    });
}
