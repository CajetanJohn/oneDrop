// ValidationLogic.js
class ValidationLogic {
    static isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static validateLogin(loginState) {
      const errors = {
        email: "",
        password: "",
      };
  
      errors.email = this.isValidEmail(loginState.email.value) ? "" : "Invalid email";
      errors.password = loginState.password.value.length >= 10 ? "" : "Password must be at least 10 characters";
  
      return errors;
    }
  
    static validateSignup(signupState) {
      const errors = {
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
      };
  
      errors.email = this.isValidEmail(signupState.email.value) ? "" : "Invalid email";
      errors.phone = signupState.phone.value.length >= 10 && signupState.phone.value.length <= 11 
        ? "" 
        : "Phone must be between 10 and 11 digits";
      errors.password = signupState.password.value.length >= 10 ? "" : "Password must be at least 10 characters";
      errors.confirmPassword = signupState.password.value && signupState.confirmPassword.value === signupState.password.value
        ? ""
        : "Passwords do not match";
  
      return errors;
    }
  }
  
  export default ValidationLogic;
  