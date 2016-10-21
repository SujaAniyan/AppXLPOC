var constants       = require('../scripts/constants');
var logger          = require(constants.paths.scripts + '/logger');
var util          = require(constants.paths.scripts + '/util');
var assetBuilder      = require(constants.paths.scripts + '/assetBuilder');
var auth          = require('./auth.js');
var menuBuilder             = require(constants.paths.scripts + '/menuBuilder');
var User            = require(constants.paths.models +  '/user');
var userService     = require(constants.paths.services +  '/users');


module.exports = function(app)
{
    // route to admin module
    app.get('/admin/', auth.isLoggedIn, function(req, res) {
    res.locals.pageTitle = "Site Administration";
    res.locals.appName = "ng-app='appXL-admin'"
    res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,admin");
    res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,admin");
        res.render('admin/home.ejs', {});
    });

  // route to profile module
  app.get('/profile/', auth.isLoggedIn, function(req, res) {
    res.locals.pageTitle = "User Profile";
    res.locals.appName = "ng-app='appXL-profile'"
    res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,profile");
    res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,profile");
        res.render('admin/home.ejs', {});
    });

  // route to dashboard module
  app.get('/dashboard/', auth.isLoggedIn, function(req, res) {
    res.locals.pageTitle = "User Dashboard";
    res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular");
    res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,home");
        res.render('ss.ejs', {});
    });

// route to positions module
  app.get('/positions/', auth.isLoggedIn, function(req, res) {
    res.locals.pageTitle = "List of Job Positions";
    res.locals.appName = "ng-app='appXL-positions'"
    res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,positions");
    res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,positions");
        res.render('admin/home.ejs', {});
    });   
    
}
