// fileSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  filename: String,
  contentType: String,
  size: Number,
  uploadDate: Date,
  data: Buffer,
});

const MusicFile = mongoose.model('musicRequests', fileSchema);

module.exports = MusicFile;
