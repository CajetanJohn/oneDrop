const bcrypt = require('bcryptjs');

const hashing = (value) => {
  //const hash = await bcrypt.hash(value, bcrypt.genSalt(10));
  return value;
};

export default hashing;
