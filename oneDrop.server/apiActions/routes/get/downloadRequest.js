// routes/getDocuments.js
const express = require('express');
const router = express.Router();
const File = require('../models/fileModel');

// Endpoint to get the list of documents
router.get('/', async (req, res) => {
  try {
    const documents = await File.find({}, { data: 0 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
