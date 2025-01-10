var express = require('express');
var request = require('request');
var crypto = require('crypto');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


// Cấu hình express-session
app.use(session({
  secret: 'keyboard cat',  

  resave: false,                // Không lưu session nếu không thay đổi
  saveUninitialized: true,      // Lưu session ngay cả khi chưa thay đổi gì
  cookie: {
    secure: false,              // Giới hạn cookie cho HTTPS
    httpOnly: true,             // Chỉ có thể truy cập cookie từ HTTP, không dùng JavaScript
    maxAge: 5 * 60 * 1000       // Thời gian hết hạn của session (5 phút)
  }
}));

// Endpoint để lấy session  
app.get('/get-session', (req, res) => {
  res.send(req.session); // Gửi toàn bộ session hiện tại về client
});

// Endpoint để thiết lập session
app.get('/set-session', (req, res) => {
  req.session.user = {     // Thiết lập thông tin vào session
    username: "Tips Javascript",
    age: 38,
    email: "anonystick@gmail.com"
  };
  res.send('Set OK!'); // Gửi thông báo về client
});

// Khởi chạy server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:3000');
});
