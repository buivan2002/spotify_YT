const express = require('express');
const session = require('express-session');
var cors = require('cors');
const path = require('path');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const  sessionConfig = require ('../Server/config/session/sessionConfig')
const router  = require ('./router/index')
const app = express();

app.use(express.static(__dirname + '/public'))
.use(cors({
  origin: "http://localhost:3000", // Cho phép frontend gọi API
  credentials: true,
})) 
.use(cookieParser());
app.use(session(sessionConfig)); 


app.use(router);


// Start server
app.listen(8888, () => {
  console.log('Server running at http://localhost:8888');
});
