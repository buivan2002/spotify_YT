const request = require('request'); // Import 'request' module
const path = require('path');
var querystring = require('querystring');
const { redirect_uri, client_id, client_secret } = require('../config/oauth/oauthConfig');
var stateKey = 'spotify_auth_state';

 function loginSpotifyCallback(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          request.get(options, function(error, response, body) {
          console.log("Spotify Response Body: ", body);
  
            const user_id = body.id;  
            console.log  ("UserID", user_id)
            // Redirect với access_token, refresh_token và user_id
            res.redirect('/UsersPlaylist?' + 
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                user_id: user_id
              }));
          });
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }

}
    module.exports = {
  loginSpotifyCallback
}
