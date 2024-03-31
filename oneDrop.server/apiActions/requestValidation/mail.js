// Email validation
function validateEmail(email) {
  const result = {
    name: 'email',
    ok: false,
    message: '',
    value: null
  };

  if (!email) {
    result.ok = false;
    result.message = 'Email cannot be empty.';
  } else {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      result.ok = false;
      result.message = 'Invalid email format.';
    } else {
      result.ok = true;
      result.value = email;
    }
  }

  return result;
}

// Example usage:
module.exports = { validateEmail };
