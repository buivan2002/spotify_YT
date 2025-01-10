const path = require('path');
var querystring = require('querystring');
const { oauth2Client } = require('../config/oauth/oauthConfig');
 async function redirect(req, res) {
    const code = req.query.code; // Trích xuất mã code từ query
    if (!code) {
      return res.send("Error: No authorization code provided");
    }
    
    try {
      // Trao đổi lấy access token
      const { tokens } = await oauth2Client.getToken(code);
      console.log(tokens)
      oauth2Client.setCredentials(tokens); // Lưu trữ token vào client
      res.redirect("/search")
    } catch (error) {
      console.error("Error while exchanging code for token:", error);
      res.send("Authentication failed");
    }

}
module.exports = {
    redirect  };