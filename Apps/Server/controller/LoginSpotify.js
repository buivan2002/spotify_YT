const {generateRandomString, client_id, redirect_uri}  = require ('../config/oauth/oauthConfig')
const path = require('path');
var querystring = require('querystring');

var stateKey = 'spotify_auth_state';

function loginSpotify(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    console.log(client_id)
    const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';
    
    // Chuyển hướng tới trang login của Spotify với thông tin đã được cấu hình
    res.redirect('https://accounts.spotify.com/authorize?' + 
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true,
      })
    );
  }
  module.exports = {
    loginSpotify
};
