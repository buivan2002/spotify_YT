const {scope} = require ('../config/oauth/oauthConfig')
const path = require('path');
var querystring = require('querystring');
var {oauth2Client} = require('../config/oauth/oauthConfig');
console.log(scope)
var authed = false;
 function google(req, res) {
    if(!authed){
        var url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            prompt: 'select_account consent',
  
            // If you only need one scope, you can pass it as a string
            scope: scope
          })
          return res.redirect(url); // Tự động redirect tới Google OAuth URL
  
    }
    res.send('Already authorized');
}

module.exports = {
    google  };