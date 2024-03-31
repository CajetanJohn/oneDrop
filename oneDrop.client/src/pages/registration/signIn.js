import React from 'react';
import Input from '../../components/common/input';
import { LoadingButton } from '../../components/common/button';
import { Link } from 'react-router-dom'; 
import SignInApi from '../../utils/services/apis/signInApi';
import hashing from '../../utils/tools/hashing';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: { value: 1, error: 0,message:'' },
      loading: false,
      username: { value: '', error: '' },
      password: { value: '', error: '' },
    };
  }

  componentDidMount() {
    // Check if there are values in the URL parameters and update the state accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('username');
    const passwordParam = urlParams.get('password');
  
    if (usernameParam) {
      this.setState(prevState => ({
        username: { ...prevState.username, value: usernameParam }
      }), () => {
      });
    }
  
    if (passwordParam) {
      this.setState(prevState => ({
        password: { ...prevState.password, value: passwordParam }
      }), () => {
        console.log("Updated State:", this.state);
      });
    }
  
  }
  
  

  handleInputChange = (name, value) => {
    this.setState(prevState => ({
      [name]: { ...prevState[name], value }
    }));

    if (name !== 'password') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(name, value);
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
    }
  };


  handleLoginButtonClick = async (e) => {
    e.preventDefault();
    const { currentPage, username, password } = this.state;
  
    // Set loading status to true
    this.setState({ loading: true });
  
    try {
      // Hash the password asynchronously
      const hashedPassword =  hashing(password.value);
  
      // Create the form data object
      const formData = {
        username: username.value,
        password: hashedPassword,
      };
  
      // Call the API to sign in
      const response = await SignInApi(formData);
  
      // Handle success case
      this.setState({ loading: false, currentPage: { ...currentPage, message: '' } });
  
    } catch (error) {
      // Handle error case
      this.setState({ loading: false, currentPage: { ...currentPage, message: error.message } });
    }
  };
  

  

  render() {
    const { loading, currentPage, username, password } = this.state;

    return (
      <div className='sign-in'>
        <main>
          <div className='sign-in-logo'>label</div>
          <div className='sign-form-section'>
            <form className='sign-in-form' noValidate>
                  <Input 
                    type='text' 
                    id="username" 
                    name="username" 
                    labelText="Username" 
                    required={true} 
                    value={username.value} 
                    onChange={(name, value) => this.handleInputChange(name, value)} 
                    error={username.error} // Pass error message for username
                  />
                  <Input 
                    type='password' 
                    id="password" 
                    name="password" 
                    labelText="Password" 
                    required={true} 
                    value={password.value} 
                    onChange={(name, value) => this.handleInputChange(name, value)} 
                    error={password.error} // Pass error message for password
                  />
                  <div className='forgot-password-div'><Link to='/forgot-password'>forgot password ?</Link></div>
                  <LoadingButton
                    text="Log In"
                    loading={loading}
                    error={currentPage.message}
                    disabled={false}
                    onClick={this.handleLoginButtonClick}
                  />
            </form>
            <div className='sign-navigation-btn'>create account? <Link to="/signup">Sign-up</Link></div>
          </div>
        </main>
      </div>
    );
  }
}

export default SignIn;
