'use strict'

/**
 * site wide static routes
 * all the pages rendered in this files are static pages such as about page
 * these pages reside in the pages directory
 */

module.exports = function (router) {

    // route to about page
    router.get('/about', function (req, res) {
        res.render('pages/about');
    })

    router.get('/COD', function(req,res) {
        res.render('pages/COD');
    })
}