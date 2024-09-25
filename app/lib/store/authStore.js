import { makeAutoObservable, reaction } from "mobx";
import ValidationLogic from "../utils/validationLogic";

class AuthStore {
  loginState = {
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  signupState = {
    email: { value: "", error: "" },
    name: { value: "", error: "" },
    phone: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  };

  forgotPasswordState = {
    email: { value: "", error: "" },
  };

  validationError = false;

  constructor() {
    makeAutoObservable(this);
    console.log('AuthStore initialized:', this);

    // Reactions for login state
    reaction(
      () => this.loginState.email.value,
      (emailValue) => {
        if (this.validationError) {
          this.loginState.email.error = emailValue ? "" : "Email is required";
        }
      }
    );

    reaction(
      () => this.loginState.password.value,
      (passwordValue) => {
        if (this.validationError) {
          this.loginState.password.error = passwordValue.length >= 10 ? "" : "Password must be at least 10 characters";
        }
      }
    );

    // Reactions for signup state
    reaction(
      () => this.signupState.email.value,
      (emailValue) => {
        if (this.validationError) {
          this.signupState.email.error = emailValue ? "" : "Email is required";
        }
      }
    );

    reaction(
      () => this.signupState.phone.value,
      (phoneValue) => {
        if (this.validationError) {
          this.signupState.phone.error = 
            phoneValue.length >= 10 && phoneValue.length <= 11 ? "" : "Phone must be between 10 and 11 digits";
        }
      }
    );

    reaction(
      () => this.signupState.password.value,
      (passwordValue) => {
        if (this.validationError) {
          this.signupState.password.error = 
            passwordValue.length >= 10 ? "" : "Password must be at least 10 characters";
        }
      }
    );

    reaction(
      () => this.signupState.confirmPassword.value,
      (confirmPasswordValue) => {
        if (this.validationError && this.signupState.password.value) {
          this.signupState.confirmPassword.error = 
            confirmPasswordValue === this.signupState.password.value ? "" : "Passwords do not match";
        }
      }
    );

    // Reactions for forgot password state
    reaction(
      () => this.forgotPasswordState.email.value,
      (emailValue) => {
        this.forgotPasswordState.email.error = emailValue ? "" : "Email is required";
      }
    );
  }

  // Set login field
  setLoginField = (field, value) => {
    console.log('Setting login field:', field, value);
    if (this.loginState.hasOwnProperty(field)) {
      this.loginState[field].value = value;
    } else {
      console.error(`Field "${field}" does not exist in loginState`);
    }
  }

  // Set signup field
  setSignupField = (field, value) => {
    console.log('Setting signup field:', field, value);
    if (this.signupState.hasOwnProperty(field)) {
      this.signupState[field].value = value;
    } else {
      console.error(`Field "${field}" does not exist in signupState`);
    }
  }

  // Set forgot password field
  setForgotPasswordField = (field, value) => {
    console.log('Setting forgotPassword field:', field, value);
    if (this.forgotPasswordState.hasOwnProperty(field)) {
      this.forgotPasswordState[field].value = value;
    } else {
      console.error(`Field "${field}" does not exist in forgotPasswordState`);
    }
  }

  validateLogin = () => {
    this.validationError = false; // Reset error state
    const errors = ValidationLogic.validateLogin(this.loginState);
    
    // Set errors to the state
    this.loginState.email.error = errors.email;
    this.loginState.password.error = errors.password;

    // Check if there are errors
    this.validationError = !!(this.loginState.email.error || this.loginState.password.error);
    
    if (!this.validationError) {
      // No errors, log the values
      console.log('Logging in with:', this.loginState.email.value, this.loginState.password.value);
    }
  }

  validateSignup = () => {
    this.validationError = false; // Reset error state
    const errors = ValidationLogic.validateSignup(this.signupState);

    // Set errors to the state
    this.signupState.email.error = errors.email;
    this.signupState.phone.error = errors.phone;
    this.signupState.password.error = errors.password;
    this.signupState.confirmPassword.error = errors.confirmPassword;

    // Check if there are errors
    this.validationError = !!(
      this.signupState.email.error ||
      this.signupState.phone.error ||
      this.signupState.password.error ||
      this.signupState.confirmPassword.error
    );

    if (!this.validationError) {
      // No errors, log the values
      console.log('Signing up with:', this.signupState.email.value, this.signupState.name.value, this.signupState.phone.value, this.signupState.password.value);
    }
  }
}

export const authStore = new AuthStore();
