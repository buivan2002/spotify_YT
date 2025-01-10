const request = require('request'); // Import 'request' module
const path = require('path');
var querystring = require('querystring');
 function UsersPlaylist(req, res) {
    const access_token = req.query.access_token; // Lấy access_token và user_id từ query string
    const user_id = req.query.user_id; // Lấy access_token và user_id từ query string
  
    if (!access_token || !user_id) {
      return res.status(400).send('Access Token and User ID are required');
    }
    req.session.access_token = access_token;
    
    console.log("Access Token đã lưu vào session:", req.session.access_token); // Kiểm tra xem token đã được lưu chưa
  
    const options = {
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      headers: { 'Authorization': `Bearer ${access_token}` },
      credentials: 'include', // Thêm thuộc tính này để gửi cookies cùng với yêu cầu
  
      json: true
    };
    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        req.session.playlists = body.items.map(item => ({
          id: item.id,
          name: item.name
        }));
        console.log(req.session.playlists);  // Kiểm tra kết quả
        res.redirect("http://localhost:3000/Usersplaylist")
      } else {
        res.status(500).json({ error: "Error fetching playlists" });
      }
    });
}
module.exports = { UsersPlaylist };
