// models/Song.js
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songName: String,
});

const Song = mongoose.model('songRequests', songSchema);

module.exports = Song;
