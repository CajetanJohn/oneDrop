const mongoose = require('mongoose');

const priceOptionSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    
  },
  price: {
    type: Number,
  },
});

const eventSchema = new mongoose.Schema({
  eventDetails: {
    location: {
      coordinates: {
        type: [Number],
      },
      locationName: {
        type: String,
      },
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    entranceFee: {
      isFree: {
        type: Boolean,
      },
      options: {
        type:[priceOptionSchema],
        default: [],
      }
    },
  },
  appearances: {
    type: [String],
  },
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
