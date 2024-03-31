// routes/songs.js
const express = require('express');
const router = express.Router();
const Song = require('../../../mongodb/schema/songSchema');

router.post('/', async (req, res) => {
  try {
    const { songName } = req.body;

    // Create a new song document
    const newSong = new Song({ songName });

    // Save the song to the MongoDB database
    const save = await newSong.save();

    res.status(201).json({ message: 'Song data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
