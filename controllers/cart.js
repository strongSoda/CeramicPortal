'use strict'

/**
 * Bring in the product & category models
 */ 
var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function(router) {
    // this route is get /cart
    router.get('/',function(req, res) {
        // get cart from session
        var cart = req.session.cart;

        var displayCart = {items: [], total: 0};
        var total = 0;

        // get total
        for(var item in cart) {
            // push the current product in the temp cart into the permanent cart
            displayCart.items.push(cart[item]);
            /**
             * calc total
             * total += qty*price (per product)
             */
            total += (cart[item].qty * cart[item].price);
        }

        displayCart.total = total;

        // render the cart view(in the public/template/cart folder) & pass the updated cart to it.
        res.render('cart/index', {
            cart: displayCart
        });
    });

    // // route to empty a cart
    // router.get('/remove', function(req,res) {
    //     req.session.cart = {};
    //     // redirect to cart
    //     res.redirect('/cart');
    // })

    //route for adding a product to cart & fetching the id of the product.
    router.post('/:id', function(req,res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        // Now find the product from dB based on the passed id
        Product.findOne({_id: req.params.id}, function(err,product){
            if(err) {
                console.log(err);
            }

            // if some item is already in cart, just increase it's qty.
            if(cart[req.params.id]) {
                cart[req.params.id].qty++;
            } 
            // if the item is not already in cart, add it in cart & make qty = 1.
            else {
                cart[req.params.id] = {
                 item: product._id,
                 title: product.title,
                 price: product.price,
                 qty: 1   
                }
            }

            // redirect to cart
            res.redirect('/cart');
        });
    });
}