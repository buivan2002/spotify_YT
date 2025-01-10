// db/redis.js
const { createClient } = require('redis');
const {RedisStore} = require('connect-redis')

// Tạo kết nối đến Redis
const redisClient = createClient();

// Bắt lỗi nếu không kết nối được
redisClient.connect().catch(console.error);

// Cấu hình RedisStore
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

module.exports = redisStore;
