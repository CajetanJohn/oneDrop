// Username validation
function validateUsername(username) {
  const result = {
    name: 'username',
    ok: false,
    message: '',
    value: null
  };

  if (!username) {
    result.ok = false;
    result.message = 'Username cannot be empty.';
  } else if (username.length > 12) {
    result.ok = false;
    result.message = 'Username cannot exceed 12 characters.';
  } else if (/^[^a-zA-Z0-9]/.test(username)) {
    result.ok = false;
    result.message = 'Username cannot start with a special character.';
  } else {
    result.ok = true;
    result.value = username;
  }

  return result;
}

module.exports = { validateUsername };
