const express = require('express');
const router = express.Router();
const Guest = require('../../../mongodb/schema/guestSchema');

// Get all guests
router.get('/', async (req, res) => {
    try {
      const guests = await Guest.find();
      res.json(guests);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;