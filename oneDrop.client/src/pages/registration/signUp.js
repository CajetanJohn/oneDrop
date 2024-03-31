import React from 'react';
import Input from '../../components/common/input';
import Select from '../../components/common/select';
import { validatePassword, validateEmail, validatePhoneNumber } from './validation'; // Import validation functions
import { LoadingButton } from '../../components/common/button';
import { Link } from 'react-router-dom';
import SignUpApi from '../../utils/services/apis/SignUpApi';
import hashing from '../../utils/tools/hashing';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: { value: 1, totalErrors: 0, message: '' },
      loading: false,
      username: { value: '', error: '' },
      mail: { value: '', error: '' },
      role: { value: '', error: '' },
      phone: { value: '', error: '' },
      password: { value: '', error: '' },
      password_confirmation: { value: '', error: '' },
      socialMedia: {
        X: { value: '', error: '' },
        facebook: { value: '', error: '' },
        instagram: { value: '', error: '' },
        tiktok: { value: '', error: '' },
      },
      streamingPlatforms: {
        sportify: { value: '', error: '' },
        youtube: { value: '', error: '' },
        applemusic: { value: '', error: '' }
      },
    };
  }

  componentDidMount() {
    // Check if there are values in the URL parameters and update the state accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('username');
    const mailParam = urlParams.get('mail');
    const roleParam = urlParams.get('role');
    const phoneParam = urlParams.get('phone');
    const passwordParam = urlParams.get('password');
    const passwordConfirmationParam = urlParams.get('password_confirmation');
    // Update the state with values from URL params
    if (usernameParam) {
      this.setState(prevState => ({
        username: { ...prevState.username, value: usernameParam }
      }));
    }
    if (mailParam) {
      this.setState(prevState => ({
        mail: { ...prevState.mail, value: mailParam }
      }));
    }
    if (roleParam) {
      this.setState(prevState => ({
        role: { ...prevState.role, value: roleParam }
      }));
    }
    if (phoneParam) {
      this.setState(prevState => ({
        phone: { ...prevState.phone, value: phoneParam }
      }));
    }
    if (passwordParam) {
      this.setState(prevState => ({
        password: { ...prevState.password, value: passwordParam }
      }));
    }
    if (passwordConfirmationParam) {
      this.setState(prevState => ({
        password_confirmation: { ...prevState.password_confirmation, value: passwordConfirmationParam }
      }));
    }
  }

  handleInputChange = (name, value) => {
    this.setState(prevState => {
      // Determine if the input belongs to socialMedia or streamingPlatforms
      const isSocialMedia = Object.keys(prevState.socialMedia).includes(name);
      const isStreamingPlatform = Object.keys(prevState.streamingPlatforms).includes(name);
  
      // Initialize error message variable
      let error = '';
  
      // Update the value for the appropriate state object
      let stateUpdate = {};
      if (isSocialMedia) {
        stateUpdate = {
          socialMedia: {
            ...prevState.socialMedia,
            [name]: { ...prevState.socialMedia[name], value }
          },
          currentPage: {
            ...prevState.currentPage,
            totalErrors:0,
            message: ''
          }
        };
      } else if (isStreamingPlatform) {
        stateUpdate = {
          streamingPlatforms: {
            ...prevState.streamingPlatforms,
            [name]: { ...prevState.streamingPlatforms[name], value }
          },
          currentPage: {
            ...prevState.currentPage,
            totalErrors:0,
            message: ''
          }
        };
      } else {
        // Handle other input fields
        switch (name) {
          case 'username':
            error = value.trim() === '' ? 'Username cannot be empty' : '';
            break;
          case 'mail':
            error = validateEmail(value).join('. ');
            break;
          case 'phone':
            error = validatePhoneNumber(value).join('. ');
            break;
          case 'password':
            error = validatePassword(value).map(err => `${err}\n`).join('');
            break;
          case 'password_confirmation':
            error = value !== prevState.password.value ? 'Passwords do not match' : '';
            break;
          default:
            break;
        }
  
        // Update the error message in the state
        stateUpdate = {
          [name]: { ...prevState[name], value, error }, // Update the error for the specific input field
          currentPage: {
            ...prevState.currentPage,
            totalErrors: this.calculateTotalErrors({ ...prevState, [name]: { ...prevState[name], error } }),
            message: ''
          }
        };
      }
  
      // Update the state with value changes
      return stateUpdate;
    }, () => {
      // Update the URL parameters when input changes
      if (name !== 'username' && name !== 'password' && name !== 'password_confirmation') {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(name, value);
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
      }
    });
  };
  
  
  calculateTotalErrors = (param) => {
    const { currentPage, socialMedia, streamingPlatforms } = param;
    let totalErrors = 0;
  
    switch (currentPage.value) {
      case 1:
        // Iterate over the keys of the state object
        Object.keys(param).forEach(key => {
          // Skip the currentPage and focusedInput states
          if (key !== 'currentPage' && key !== 'socialMedia' && key !== 'streamingPlatforms' && key !== 'loading') {
            // Check if the input has an error
            if (param[key].error !== '') {
              totalErrors++;
            }
          }
        });
        break;
      case 2:
        // Check errors for social media inputs
        Object.values(socialMedia).forEach(input => {
          if (input.error !== '') {
            totalErrors++;
          }
        });
        break;
      case 3:
        // Check errors for streaming platform inputs
        Object.values(streamingPlatforms).forEach(input => {
          if (input.error !== '') {
            totalErrors++;
          }
        });
        break;
      default:
        break;
    }
  
    return totalErrors;
  };
  

  handleNextButtonClick = (e) => {
    e.preventDefault();
    const { currentPage, socialMedia, streamingPlatforms } = this.state;
  
    switch (currentPage.value) {
      case 1:
        // Check if all the inputs are inserted
        let totalErrorsPage1 = 0;
        let messagePage1 = '';
  
        const inputs = document.querySelectorAll('[required]');
        inputs.forEach(input => {
          if (input.value === '') {
            this.setState(prevState => ({
              [input.name]: { ...prevState[input.name], error: "field required" },
            }));
            totalErrorsPage1++;
          }
        });
  
        if (totalErrorsPage1 > 0) {
          messagePage1 = 'Some fields are empty.';
        }
  
        this.setState(prevState => ({
          currentPage: { ...prevState.currentPage, totalErrors: totalErrorsPage1, message: messagePage1 }
        }), () => {
          if (this.state.currentPage.totalErrors === 0) {
            this.setState(prevState => ({
              currentPage: { value: prevState.currentPage.value + 1, totalErrors: 0, message: '' }
            }));
          }
        });
        break;
  
      case 2:
        // Check if at least one input is filled and no input has an error
        const atLeastOneFilled = Object.values(socialMedia).some(input => input.value.trim() !== '');
        const noError = Object.values(socialMedia).every(input => input.error === '');
        let totalErrorsPage2 = 0;
        let messagePage2 = '';
  
        if (!atLeastOneFilled) {
          totalErrorsPage2++;
          messagePage2 = "Insert atleast one field"
        }
        if (!noError) {
          totalErrorsPage2 += Object.values(socialMedia).filter(field => field.error !== '').length;
          messagePage2 = 'Some inputs are invalid.'
        }
  
        this.setState(prevState => ({
          currentPage: { ...prevState.currentPage, totalErrors: totalErrorsPage2, message: messagePage2 }
        }), () => {
          if (this.state.currentPage.totalErrors === 0) {
            this.setState(prevState => ({
              currentPage: { value: prevState.currentPage.value + 1, totalErrors: 0, message: '' }
            }));
          }
        });
        break;
  
      case 3:
        // Check if at least one input is filled and no input has an error
        const atLeastOneFilledStreaming = Object.values(streamingPlatforms).some(input => input.value.trim() !== '');
        const noErrorStreaming = Object.values(streamingPlatforms).every(input => input.error === '');
        let totalErrorsPage3 = 0;
        let messagePage3 = '';
  
        if (!atLeastOneFilledStreaming) {
          totalErrorsPage3++;
          messagePage3 = "Insert atleast one field"
        }
        if (!noErrorStreaming) {
          totalErrorsPage3 += Object.values(streamingPlatforms).filter(field => field.error !== '').length;
          messagePage3 ="Some inputs are invalid."
        }
  
        this.setState(prevState => ({
          currentPage: { ...prevState.currentPage, totalErrors: totalErrorsPage3, message: messagePage3 }
        }), () => {
          if (this.state.currentPage.totalErrors === 0) {
            console.log("page added");
            this.setState(prevState => ({
              currentPage: { value: prevState.currentPage.value + 1, totalErrors: 0, message: '' }
            }));
          }
        });
        break;
  
      default:
        break;
    }
  };
  

  handleBackButtonClick = (e) => {
    this.setState(prevState => ({
      currentPage: { value: prevState.currentPage.value - 1, totalErrors: 0, message:'' }
    }));

  }

async handleSignUpButtonClick(e) {
    e.preventDefault();
  
    const { currentPage, role, username, mail, phone, password, password_confirmation, socialMedia, streamingPlatforms } = this.state;
  
    // Check if all required fields are filled
    let allFieldsFilled = true;
  
    // Check each field and update its error if empty
    if (role.value === '') {
      this.setState(prevState => ({
        role: { ...prevState.role, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (mail.value === '') {
      this.setState(prevState => ({
        mail: { ...prevState.mail, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (phone.value === '') {
      this.setState(prevState => ({
        phone: { ...prevState.phone, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (password.value === '') {
      this.setState(prevState => ({
        password: { ...prevState.password, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (password_confirmation.value === '') {
      this.setState(prevState => ({
        password_confirmation: { ...prevState.password_confirmation, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (role.value === 'dj' && username.value === '') {
      this.setState(prevState => ({
        username: { ...prevState.username, error: 'field required' }
      }));
      allFieldsFilled = false;
    }
  
    if (role.value === 'dj' && currentPage.value === 2) {
      let socialMediaFilled = false; // Flag to track if at least one social media platform is filled
  
      Object.keys(socialMedia).forEach(key => {
        if (socialMedia[key].value !== '') {
          socialMediaFilled = true; // At least one social media platform is filled
        }
  
        if (socialMedia[key].error !== '') {
          allFieldsFilled = false; // At least one social media platform has an error
          this.setState(prevState => ({
            currentPage: {
              ...prevState.currentPage,
              totalErrors: 1,
              message: 'There is some error in your inputs'
            }
          }));
        }
      });
  
      if (!socialMediaFilled) {
        // No social media platform is filled
        this.setState(prevState => ({
          currentPage: {
            ...prevState.currentPage,
            totalErrors: 1,
            message: 'Insert atleast one social media plartform'
          }
        }));
      }
    }
  
    if (role.value === 'dj' && currentPage.value === 3) {
      let streamingPlatformsFilled = false; // Flag to track if at least one streaming platform is filled
  
      Object.keys(streamingPlatforms).forEach(key => {
        if (streamingPlatforms[key].value !== '') {
          streamingPlatformsFilled = true; // At least one streaming platform is filled
        }
  
        if (streamingPlatforms[key].error !== '') {
          allFieldsFilled = false; // At least one streaming platform has an error
          this.setState(prevState => ({
            currentPage: {
              ...prevState.currentPage,
              totalErrors: 1,
              message: 'There is some error in your inputs'
            }
          }));
        }
      });
  
      if (!streamingPlatformsFilled) {
        // No streaming platform is filled
        this.setState(prevState => ({
          currentPage: {
            ...prevState.currentPage,
            totalErrors: 1,
            message: 'Insert atleast one streaming plartform'
          }
        }));
      }
    }
  
    // Ensure state is updated before checking totalErrors
    this.setState(prevState => {
      if (allFieldsFilled && prevState.currentPage.totalErrors === 0) {
        // Proceed with further actions
        this.setState({ loading: true }, async () => {
          try {
            const hashedPassword = hashing(password.value)

            const keysWithValue = Object.keys(prevState).filter(key =>
              (prevState[key].value !== '' || (key === 'socialMedia' && role.value === 'dj') || (key === 'streamingPlatforms' && role.value === 'dj')) &&
              key !== 'currentPage' &&
              key !== 'focusedInput' &&
              key !== 'loading' &&
              key !== 'password_confirmation'
            );
    
            const formData = keysWithValue.reduce((acc, key) => {
              if (key === 'socialMedia' || key === 'streamingPlatforms') {
                const subKeys = Object.keys(prevState[key]);
                const subData = subKeys.reduce((subAcc, subKey) => {
                  if (prevState[key][subKey].value !== '') {
                    subAcc[subKey] = prevState[key][subKey].value;
                  }
                  return subAcc;
                }, {});
                acc[key] = subData;
              } else {
                acc[key] = prevState[key].value;
              }
              return acc;
            }, {});

            formData.password = hashedPassword; // Append hashed password to formData

            SignUpApi(formData)
              .then(response => {
                // Handle success case
                this.setState({ loading: false, currentPage: { ...currentPage, message: '' } });
              })
              .catch(error => {
                // Handle error case
                this.setState({ loading: false, currentPage: { ...currentPage, message: error.message } });
              });
          } catch (error) {
            console.error('Error hashing password:', error);
            this.setState({ loading: false, currentPage: { ...currentPage, message: 'Error hashing password' } });
          }
        });
      } else {
        // Update currentPage.message state with the error message
        this.setState({
          currentPage: {
            ...prevState.currentPage,
            message: 'Error! Ensure all required fields are filled correctly.'
          }
        });
      }
      return null;
    });
  }

  
  
  
  render() {
    const { loading, role, mail, phone, currentPage, username, password, password_confirmation, socialMedia, streamingPlatforms } = this.state;

    return (
      <div className='sign-in'>
        <main>
          <div className='sign-in-logo'>label</div>
          <div className='sign-form-section'>
            <form className='sign-in-form' noValidate>
              <div className='sign-in-input'>
                {currentPage.value === 1 && (
                  <>
                    <Select id="role" name="role" labelText="Role"
                    required={true}
                    options={[
                      { value: 'audience', label: 'Audience' },
                      { value: 'dj', label: 'DJ' },
                      { value: 'organiser', label: 'Organiser' } 
                    ]}
                    value={role.value} onChange={(name, value) => this.handleInputChange(name, value)} 
                    />


                    {role.value === 'dj' && (
                      <Input type='text' id="username" name="username" labelText="Username" required={true} value={username.value} onChange={(name, value) => this.handleInputChange(name, value)} error={username.error} />
                    )}
                    <Input type='text' id="mail" name="mail" labelText="e-mail" required={true} value={mail.value} onChange={(name, value) => this.handleInputChange(name, value)} error={mail.error} />
                    <Input type='number' id="phone" name="phone" labelText="Phone Number" required={true} value={phone.value} onChange={(name, value) => this.handleInputChange(name, value)} error={phone.error} />
                    <Input type='password' id="password" name="password" labelText="Password" required={true} value={password.value} onChange={(name, value) => this.handleInputChange(name, value)} error={password.error} />
                    <Input type='password' id="password_confirmation" name="password_confirmation" labelText="Confirm password" required={true} value={password_confirmation.value} onChange={(name, value) => this.handleInputChange(name, value)} error={password_confirmation.error} />

                    <LoadingButton
                      text={role.value === 'dj' ? "Next" : "Sign Up"}
                      loading={loading}
                      error={currentPage.message}
                      disabled={false}
                      onClick={(e) => { role.value === "dj" ? this.handleNextButtonClick(e) : this.handleSignUpButtonClick(e); }}
                    />
                  </>
                )}

                {currentPage.value === 2 && role.value === 'dj' && (
                  <>
                    <div className="sign-back-btn" onClick={(e) => {this.handleBackButtonClick(e)}}> Back</div>
                    {Object.keys(socialMedia).map((socialMediaKey) => (
                      <Input key={socialMediaKey} type='text' id={socialMediaKey} name={socialMediaKey} labelText={`${socialMediaKey.charAt(0).toUpperCase() + socialMediaKey.slice(1)} account`} value={socialMedia[socialMediaKey].value} onChange={(name, value) => this.handleInputChange(name, value)} error={socialMedia[socialMediaKey].error} />
                    ))}
                    <LoadingButton
                      text={role.value === 'dj' ? "Next" : "Sign Up"}
                      loading={loading}
                      error={currentPage.message}
                      disabled={false}
                      onClick={(e) => {
                        role.value === "dj" ? this.handleNextButtonClick(e) : this.handleSignUpButtonClick(e);
                      }}
                    />
                  </>
                )}

                {currentPage.value === 3 && role.value === 'dj' && (
                  <>
                    <div className="sign-back-btn" onClick={(e) => {this.handleBackButtonClick(e)}}> Back</div>
                    {Object.keys(streamingPlatforms).map((platformKey) => (
                      <Input key={platformKey} type='text' id={platformKey} name={platformKey} labelText={`${platformKey.charAt(0).toUpperCase() + platformKey.slice(1)}`} value={streamingPlatforms[platformKey].value} onChange={(name, value) => this.handleInputChange(name, value)} error={streamingPlatforms[platformKey].error} />
                    ))}

                    <LoadingButton text="Sign Up" loading={loading} error={currentPage.message} disabled={false} onClick={(e)=>{this.handleSignUpButtonClick(e)}} />
                  </>
                )}

              </div>
            </form>
            <div className='sign-navigation-btn'>have an account? <Link to="/signin">Log-in</Link></div>
          </div>
        </main>
      </div>
    );
  }
}

export default SignUp;
