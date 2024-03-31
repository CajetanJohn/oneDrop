// routes/get/signIn.js
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { connectDb, disconnectDb } = require('../../../mongodb/connect');
const User = require('../../../mongodb/schema/userSchema');
const { Hash } = require('../../utils/hash');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDb('zone');
    const UserModel = new User().constructor;

    const user = await UserModel.findOne({ email });

    if (!user || Hash(password) !== user.password) {
      res.status(401).send('Login failed');
      return;
    }

    // Set session information
    req.session.user = { email: user.email, _id: user._id };
    req.session.isAuth = true;

    // Save the session
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Login successful');
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await disconnectDb();
  }
});

module.exports = router;
