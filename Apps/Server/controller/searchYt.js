const { search } = require("../router");


const path = require('path');
var querystring = require('querystring');
const { youtube } = require("../config/oauth/oauthConfig");

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

  
 async function seach(req, res) {

    try {
        const search = req.session.music.songs;
        console.log("ten search", search)
    
        const allSongNames = search.map(song => song.name);
        const nameList = req.session.music.playlistName
        console.log("ten list", nameList)
        // Tạo playlist trước
        const playlist = await youtube.playlists.insert({
            part: 'snippet,status',
            requestBody: {
                snippet: {
                    title: nameList, // Tên playlist
                    description: "Playlist created by app", // Mô tả playlist
                },
                status: {
                    privacyStatus: "private" // Playlist sẽ là chế độ riêng tư
                }
            }
        });
    
        console.log("Playlist ID:", playlist.data.id);
    
        // Hàm để thêm video vào playlist
        const addVideoToPlaylists = async (videoId) => {
            await youtube.playlistItems.insert({
                part: 'snippet',
                requestBody: {
                    snippet: {
                        playlistId: playlist.data.id,  // ID của playlist vừa tạo
                        resourceId: {
                            kind: 'youtube#video',
                            videoId: videoId
                        }
                    }
                }
            });
        };
    
        // Lặp qua tất cả tên bài hát và tìm kiếm video từng bài một
        for (const songName of allSongNames) {
            const response = await youtube.search.list({
                part: 'snippet',   // Thông tin chi tiết về video
                q: songName,       // Từ khóa tìm kiếm (tên bài hát)
                maxResults: 1,     // Số kết quả trả về
                type: 'video',     // Tìm kiếm video
            });
    
            const itemsToAdd = response.data.items;
    
            if (itemsToAdd.length > 0) {
                const videoId = itemsToAdd[0].id.videoId;
                console.log(`Adding video with ID: ${videoId} to playlist...`);
    
                // Thêm video vào playlist
                await addVideoToPlaylists(videoId);
            }
        }
    
        res.redirect("http://localhost:3000/Usersplaylist")
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
}
module.exports = { seach };
