// guest.js
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  requests: {
    type: String,
    default: '',
  },
});

const Guest = mongoose.model('guests', guestSchema);

module.exports = Guest;
