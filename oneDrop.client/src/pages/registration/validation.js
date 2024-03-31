export const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one digit');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    return errors;
};

export const validateEmail = (email) => {
    const errors = [];
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      errors.push('Invalid email address');
    }
    return errors;
};

export const validatePhoneNumber = (phone) => {
    const errors = [];
    const re = /^\d{10}$/;
    if (!re.test(phone)) {
      errors.push('Invalid phone number');
    }
    return errors;
};

