import React from 'react';
import Icon from '../../assets/icons/icons';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      value: this.props.value // State to store input value
    };
  }

  // Update the state when the value prop changes
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ value });

    // Call the callback function passed from the parent component
    if (this.props.onChange) {
      this.props.onChange(this.props.name, value);
    }
  };

  render() {
    // Accessing props passed down from the parent component
    const { id, labelText, type, required, error, ...rest } = this.props;
    const { showPassword } = this.state;

    // Determine if error is an array or a string
    const errorMessages = Array.isArray(error) ? error : [error];

    return (
      <>
        <div className="input-field">
          <input
            className={`input ${error ? 'invalid' : 'valid'}`} // Apply invalid class if there is an error
            type={type === 'password' && showPassword ? 'text' : type}
            id={id}
            {...rest}
            required={required}
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          {type === 'password' && (showPassword ?
            (<div className='icon-container'><Icon name="hide" onClick={this.togglePasswordVisibility} style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(100%, -50%)' }} /></div>)
            : (<div className='icon-container'><Icon name="show" onClick={this.togglePasswordVisibility} style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(100%, -50%)' }}/></div>)
          )}
          <label htmlFor={id}>{labelText}</label>
          <style>
          {`
            .input-field {
              position: relative;
              width: 100%;
              min-height: 44px;
              height:fit-content;
              line-height: 44px;
              margin-top: 20px;
              background:none;
            }
            .input-field label {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              color: var(--txtc);
              transition: 0.2s all;
              cursor: text;
              pointer-events:none;
              font-size:0.6rem;
            }
            .input {
              width: calc(100% - 1rem);
              border: 0;
              outline: 0;
              padding: 0.5rem;
              border-bottom: 2px solid var(--txtc);
              box-shadow: none;
              color: var(--txtc);
              background:none;
              font-size: 0.8rem;
              background-color:none;
              box-shadow:transparent;
            }
            .input.invalid {
              outline: 0;
              color: var(--invalid-txtc);
              border-color: var(--invalid-txtc);
            }
            .input:focus,
            .input.valid {
              border-color: var(--txtc);
            }

            .input:focus ~ label{
              top: -24px;
            }

            .input:focus.valid ~ label,
            .input:valid ~ label {
              font-size: 0.7rem;
              top: -24px;
              color: var(--txtc);
            }

            .input.invalid ~ span{
              display:none;
              margin:0;
              line-height:normal;
            }

            .input:focus.invalid ~ span {
              color:var(--invalid-txtc);
              display:block;
            }
            .input:focus.invalid ~ label {
              color: var(--invalid-txtc);
            }
            .icon-container{
              position:absolute;
              bottom:50%;
              right: 30px;
              z-index:1;
              height:100%;
              padding:0 5px;
              transform:translateY(50%);
            }
            .error{
              color: var(--invalid-txtc);
              font-size:0.6rem;
            }
            .feedBack{
              color:var()
            }
          `}
        </style>
        </div>
        {errorMessages.map((errorMessage, index) => (
          <span key={index} className="error">{errorMessage}</span>
        ))}
      </>
    );
  }
}

export default Input;

