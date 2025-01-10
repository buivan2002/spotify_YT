const path = require('path');
var querystring = require('querystring');
const request = require('request'); // Import 'request' module
 function nameSpotify(req, res) {
    const { id, name } = req.query;

    var access_token= req.session.access_token
    const playlists = id ;
    console.log("id playlist",playlists)
    console.log("token trong session",access_token)
   
   
    const options = {
        url: `https://api.spotify.com/v1/playlists/${playlists}/tracks`,
         headers: { 'Authorization': `Bearer ${access_token}` },

        json: true
      };
    request.get(options,function(error,response,body){
        if(!error && response.statusCode === 200){
          req.session.music = {
            playlistName: name ,  // Tên playlist
            songs: body.items.map(s => ({
                name: s.track.name  // Tên mỗi bài hát trong playlist
            }))
        };
          console.log("ten bai",req.session.music);
            res.redirect("/google?="+ 
              querystring.stringify({
                namelist: name,})
              )
        }
        else{
            res.status(500).send('Error fetching playlist');
        }

    })
}
module.exports = {
  nameSpotify  };