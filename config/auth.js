// config/auth.js

// OpenAuth configuration parameters
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1740543096218994', 
        'clientSecret'    : '0ee5a61dda75adf34a297c314c05eafc', 
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'QfzZneAoK7IMWpw2uV8sllzr1',
        'consumerSecret'     : 'ngFMjuUHfLX7ReUSi4mxa6ReXBBtWlUDNgF6i5uoFrq9Np1e6a',
        'callbackURL'        : 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '991972540771-ehsu8cs9u67ols5kesq27o4e324qfbke.apps.googleusercontent.com',
        'clientSecret'     : 'du_pv9aV2hlkahQDsPOy2UED',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }
};
