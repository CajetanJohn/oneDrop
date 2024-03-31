// eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../../../mongodb/schema/eventSchema');

// Create endpoint to insert data
router.post('/', async (req, res) => {
  try {
    const eventData = req.body; // Access the data directly from req.body
    //console.log(eventData); // Log the received data for debugging

    const event = new Event(eventData);
    await event.save();
    res.status(201).json({ message: 'Event inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
