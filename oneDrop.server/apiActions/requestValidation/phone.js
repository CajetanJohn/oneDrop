// Phone number validation
function validatePhoneNumber(phoneNumber, country='US') {
  const result = {
    name: 'phonenumber',
    ok: false,
    message: '',
    value: null,
    country: null
  };

  if (!phoneNumber) {
    result.message = 'Phone number cannot be empty.';
  } else {
    // Define minimum and maximum number of characters based on country
    const characterLimits = {
      'US': { min: 10, max: 12 }, // Example: US phone numbers have 10 or 11 digits
      'UK': { min: 10, max: 13 }, // Example: UK phone numbers have 10, 11, or 12 digits
      // Add more countries as needed
    };

    const limits = characterLimits[country];

    if (phoneNumber.length < limits.min || phoneNumber.length > limits.max) {
      result.message = `Invalid number of characters for ${country} phone number.`;
    } else {
      result.ok = true;
      result.value = phoneNumber;
    }
  }

  return result;
}

module.exports = { validatePhoneNumber };
