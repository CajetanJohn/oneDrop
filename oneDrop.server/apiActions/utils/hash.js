const crypto = require('crypto');

// Hashing function using crypto
const Hash = (input) => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
  };

module.exports = {Hash}