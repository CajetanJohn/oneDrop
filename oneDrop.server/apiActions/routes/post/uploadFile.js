const express = require('express');
const router = express.Router();
const { Readable } = require('stream');
const multer = require('multer');
const { connectDb, disconnectDb } = require('../../../mongodb/connect');
const musicFile = require('../../../mongodb/schema/fileSchema');

// Multer middleware for handling file uploads
const upload = multer();

// Apply the multer middleware here, specifying 'file' as the field name
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const db = await connectDb("zone"); // Connect to MongoDB

    // Instead of using GridFSBucket with 'musicRequests', create a model for 'Requests'
    const Requests = db.collection('musicRequests');

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { originalname, buffer, mimetype } = req.file;

    // Use Readable.from to create a Readable stream from the buffer
    const fileData = Readable.from(buffer);

    // Insert the file data directly into the 'Requests' collection
    const uploadResult = await Requests.insertOne(new musicFile({
      filename: originalname,
      contentType: mimetype,
      size: buffer.length,
      uploadDate: new Date(),
      data: buffer,
    }));

    res.status(200).json({ message: 'File uploaded successfully', file: uploadResult });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
