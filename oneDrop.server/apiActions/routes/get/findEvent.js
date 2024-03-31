const express = require('express');
const router = express.Router();
const Event = require('../../../mongodb/schema/eventSchema');

router.get('/', async (req, res) => {
  try {
    const { id } = req.query;

    // Check if an id is provided
    let query = {};
    if (id) {
      // If id is a string, use it directly in the query
      if (typeof id === 'string') {
        query = { _id: id };
      } else if (Array.isArray(id)) {
        // If id is an array, use the $in operator to filter events by multiple ids
        query = { _id: { $in: id } };
      }
    }

    const events = await Event.find(query).lean(); // Use lean to get plain JavaScript objects
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
