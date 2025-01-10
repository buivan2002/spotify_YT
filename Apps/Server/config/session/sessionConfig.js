// sessionConfig.js
const redisStore = require('../db/redis'); // Import Redis store từ db/redis

module.exports = {
  secret: 'keyboard cat',
  store: redisStore, // Store của Redis
  resave: false,  // Chỉ lưu session nếu có sự thay đổi
  saveUninitialized: false,  // Tránh tạo session không cần thiết
  cookie: {
    secure: false, // Set true nếu sử dụng HTTPS
    httpOnly: true, // Bảo vệ cookie khỏi truy cập từ JS
    maxAge: 24 * 60 * 60 * 1000,  // 1 ngày
    sameSite: 'lax',  // Tối ưu hoá chia sẻ cookie giữa các domains/ports
  },
};
