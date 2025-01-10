const express = require ('express');
const {google} = require('googleapis');
var cookieParser = require('cookie-parser');
const path = require('path');

var cors = require('cors');

const app = express();
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

const Oauth2Data = require('./../client_secret_333484846582-tkrt35qa1vcr9bucgt2a8a4ihib897ck.apps.googleusercontent.com.json')
const CLIENT_ID = Oauth2Data.web.client_id;
const CLIENT_SECRET = Oauth2Data.web.client_secret;
const REDIRECT_URI = 'http://localhost:8888/redirect';
const scope = "https://www.googleapis.com/auth/youtube.force-ssl"
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
const youtube = google.youtube({
    version: 'v3',  
    auth: oauth2Client,
})
const addVideoToPlaylist = async (videoId) => {
    let max_retries = 5; // Số lần thử lại tối đa
    let retry_count = 0; // Đếm số lần thử lại
    let backoff_time = 1000; // Thời gian chờ ban đầu (1 giây)
    let max_backoff_time = 16000; // Thời gian chờ tối đa (16 giây)
  
    while (retry_count < max_retries) {
      try {
        // Gửi yêu cầu thêm video vào playlist
        await youtube.playlistItems.insert({
          part: 'snippet',
          requestBody: {
            snippet: {
              playlistId: "PLJDaNvPR2I3BVtiDd_DojQb01VijaWKyG", // Playlist ID
              resourceId: {
                kind: "youtube#video",
                videoId: videoId
              }
            }
          }
        });
  
        console.log('Video added to playlist:', videoId);
        break; // Thành công thì thoát vòng lặp
  
      } catch (error) {
        console.error('Error adding video to playlist:', error);
  
        // Nếu lỗi thì tăng số lần thử lại và thời gian chờ
        retry_count += 1;
        console.log(`Attempt ${retry_count} failed. Retrying in ${backoff_time / 1000} seconds...`);
  
        // Thời gian chờ sau mỗi lần thất bại (exponential backoff)
        await new Promise(r => setTimeout(r, backoff_time));
  
        // Tăng thời gian chờ (với giới hạn tối đa)
        backoff_time = Math.min(backoff_time * 2, max_backoff_time);
      }
    }
  
    if (retry_count === max_retries) {
      console.log("Max retries reached. Could not add video to playlist.");
    }
  };
  
var authed = false; 
app.get("/", (req,res)=>{

    if(!authed){
        var url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            prompt: 'select_account consent',

            // If you only need one scope, you can pass it as a string
            scope: scope
          })
    }
    res.send(`<a href="${url}">Click here to authorize this app</a>`);
})

app.get("/redirect", async (req, res) => {
    const code = req.query.code; // Trích xuất mã code từ query
    if (!code) {
      return res.send("Error: No authorization code provided");
    }
    
    try {
      // Trao đổi lấy access token
      const { tokens } = await oauth2Client.getToken(code);
      console.log(tokens)
      oauth2Client.setCredentials(tokens); // Lưu trữ token vào client
      res.sendFile(path.join(__dirname, 'search.html'));
    } catch (error) {
      console.error("Error while exchanging code for token:", error);
      res.send("Authentication failed");
    }
  });
app.get("/search",async (req,res,next)=>{
  
      try {
        const search = req.query.q
        const response = await youtube.search.list({
          part: 'snippet',    // Thông tin chi tiết về video
          q: search,           // Từ khóa tìm kiếm
          maxResults: 2,     // Số kết quả trả về
          type: 'video',      // Tìm kiếm video
        });

    //     const playlist = await youtube.playlists.insert({
    //         part: 'snippet,status',
    //         requestBody: {
    //             snippet: {
    //                 title: "New Playlist",  // Tên playlist
    //                 description: "Playlist created by app", // Mô tả playlist
    //             },
    //             status: {
    //                 privacyStatus: "private" // Playlist sẽ là chế độ riêng tư
    //             }
    //         }
    // });
    // console.log(playlist.data.id)
    const itemsToAdd = response.data.items;
   
   await itemsToAdd.map(item => addVideoToPlaylist(item.id.videoId));
    res.send('Playlist and videos created successfully');

}      
catch (err) {
    console.error("Error while fetching the token:", err);
    if (err.response) {
      // Trả về thông tin từ response nếu có
      console.error("Response:", err.response.data);
    }
    if (err.message) {
      console.error("Message:", err.message);
    }
    // next(err)
  }
})





app.listen(8888,()=>{
    console.log(`app is listening on port 8888`)
})