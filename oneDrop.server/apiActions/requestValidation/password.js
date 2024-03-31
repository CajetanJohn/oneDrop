const crypto = require('crypto');
const {Hash} = require('../utils/hash')

// Password validation and hashing
function validatePassword(password) {
  const result = {
    name: 'password',
    ok: false,
    message: '',
    value: null
  };

  const minLength = 8;

  // Check if password is at least 8 characters long
  if (password.length < minLength) {
    result.message = 'Password must be at least 8 characters long.';
  } else {
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      result.message = 'Password must contain at least one lowercase letter.';
    }
    // Check if password contains at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      result.message = 'Password must contain at least one uppercase letter.';
    }
    // Check if password contains at least one number
    else if (!/\d/.test(password)) {
      result.message = 'Password must contain at least one number.';
    }
    // Check if password contains only alphanumeric characters
     else if (!/[!@#]/.test(password)) {
      result.message = 'Password must contain at least one of the special characters: !, @, or #.';
    } else {
      // Hash the password using SHA-256
      result.ok = true;
      result.value = Hash(password);
    }
  }

  return result;
}

module.exports = { validatePassword };
