const express = require('express');

const {loginSpotify} = require('../controller/LoginSpotify');
const {loginSpotifyCallback} = require('../controller/loginSpotifyCallback');
const {UsersPlaylist} = require('../controller/UsersPlaylist');
const {nameSpotify} = require('../controller/nameSpotify');
const {google} = require('../controller/Google');
const {refresh_token} = require('../controller/refresh_token_spotify');
const {redirect} = require('../controller/redirect_gg');
const { seach} = require('../controller/searchYt');

const router = express.Router();

// Điều hướng route từ controller
router.get('/loginSpotify', loginSpotify);
router.get('/callback', loginSpotifyCallback);
router.get('/UsersPlaylist', UsersPlaylist);
router.get('/nameSpotify', nameSpotify);
router.get('/google', google);
router.get('/refresh_token', refresh_token);
router.get('/redirect', redirect);
router.get('/search', seach);

// Trả router để sử dụng trong app.js
module.exports = router;
