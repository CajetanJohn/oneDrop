// routes/get/signOut.js
const express = require('express');
const router = express.Router();
const { disconnectDb } = require('../../../mongodb/connect');
const User = require('../../../mongodb/schema/userSchema');

router.get('/', async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy();
    res.status(200).send('Logout successful');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectDb();
  }
});

module.exports = router;
