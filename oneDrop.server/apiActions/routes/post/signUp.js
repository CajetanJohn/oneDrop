// signup.js
const express = require('express');
const router = express.Router();
const User = require('../../../mongodb/schema/userSchema');
const { validatePassword } = require('../../requestValidation/password');
const { validateUsername } = require('../../requestValidation/userName');
const { validateRole } = require('../../requestValidation/role');
const { validateEmail } = require('../../requestValidation/mail');
const { validatePhoneNumber } = require('../../requestValidation/phone');
const { generateId } = require('../../requestValidation/generateId');

router.post('/', async (req, res) => {
  const { password, email, role, username, phoneNumber, country } = req.body;

  try {
    // Validate user input
    const validation = [
      validateUsername(username),
      validateEmail(email),
      validateRole(role),
      validatePhoneNumber(phoneNumber, country),
      validatePassword(password),
    ];

    const validationErrors = validation.filter((result) => !result.ok);

    if (validationErrors.length > 0) {
      const error = validationErrors.reduce((acc, result) => {
        acc[result.name] = result.message;
        return acc;
      }, {});
      return res.status(500).send(error);
    }

    // Custom user creation
    const newUser = new User({
      userid: generateId(),
      username: validation[0].value,
      email: validation[1].value,
      password: validation[4].value,
      role: validation[2].value,
      phone: validation[3].value,
    });
    // Insert user into the collection using Mongoose
    await newUser.save();

    res.status(200).send('Sign up successful');
    
  } catch (error) {
    res.status(500).send('Sign up failed' + error);
  }
});

module.exports = router;
