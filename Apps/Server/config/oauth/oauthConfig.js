// ./config/config.js
const { google }  = require('googleapis')
const dotenv  = require( 'dotenv')
const crypto  = require( 'crypto')

// Tải các biến môi trường từ file .env
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const scope  = process.env.SCOPE;

const client_id = process.env.Spotify_client_id;
const client_secret = process.env.Spotify_client_secret;
const redirect_uri = process.env.Spotify_redirect_uri;

const oauth2Client  = new google.auth.OAuth2(
 CLIENT_ID,
 CLIENT_SECRET,
 REDIRECT_URI
);

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client 
});


// Function tạo chuỗi ngẫu nhiên (dùng trong OAuth)
const generateRandomString = (length) => {
  return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0, length);
};

// Export các giá trị cần thiết
module.exports = {
  oauth2Client , youtube,client_id,client_secret,redirect_uri, scope,
  generateRandomString, 
};
