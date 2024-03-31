// guests.js
const express = require('express');
const router = express.Router();
const Guest = require('../../../mongodb/schema/guestSchema');

// Create a new guest
router.post('/', async (req, res) => {
  try {
    const { guestId, name, date, requests } = req.body;
    const newGuest = new Guest({ guestId, name, date, requests });
    const savedGuest = await newGuest.save();
    res.json(savedGuest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
