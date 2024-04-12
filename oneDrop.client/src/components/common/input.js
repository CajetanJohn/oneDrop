import React, {useState, useEffect} from 'react';
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
            .input-field .input {
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
            .input-field .input.invalid {
              outline: 0;
              color: var(--invalid-txtc);
              border-color: var(--invalid-txtc);
            }
            .input-field .input:focus,
            .input-field .input.valid {
              border-color: var(--txtc);
            }

            .input-field .input:focus ~ label{
              top: -24px;
            }

            .input-field .input:focus.valid ~ label,
            .input-field .input:valid ~ label {
              font-size: 0.7rem;
              top: -24px;
              color: var(--txtc);
            }

            .input-field .input.invalid ~ span{
              display:none;
              margin:0;
              line-height:normal;
            }

            .input-field .input:focus.invalid ~ span {
              color:var(--invalid-txtc);
              display:block;
            }
            .input-field .input:focus.invalid ~ label {
              color: var(--invalid-txtc);
            }
            .input-field .icon-container{
              position:absolute;
              bottom:50%;
              right: 30px;
              z-index:1;
              height:100%;
              padding:0 5px;
              transform:translateY(50%);
            }
            .input-field .error{
              color: var(--invalid-txtc);
              font-size:0.6rem;
            }
            .input-field .feedBack{
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



export const RangeInput = ({ min, max, value , onChange, steps, labelText, id, name }) => {
  const [rangeValue, setRangeValue] = useState(value || min || 0);

  const handleChange = (name, newValue=value) => {
    setRangeValue(newValue);
    onChange(name, newValue);
  };

  useEffect(() => {
    setRangeValue(value)    
  }, [value])
  

  return (
    <div className="range-input-container">
      <label htmlFor={id}>{labelText} :: {rangeValue}</label>
      <div>
        <input type="range" min={min} max={max} name={name} id={id} steps={steps} value={rangeValue} onChange={(name, value)=>{handleChange(name, value)}} className="custom-range-input" />
        <div className="value-marker" style={{ left: `${((rangeValue - min) / (max - min)) * 100}%` }}>{rangeValue}</div>
      </div>
      <style jsx>{`
        .range-input-container {
          position: relative;
          height:fit-content;
          min-height:40px;
          width:100%;
        }

        .value-label {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
        }

        .custom-range-input {
          --track-color: var(--txtc);
          --track-width: 2px;
          --thumb-color: var(--txtc);
          --thumb-size: 15px;
          width: 100%;
        }

        .custom-range-input::-webkit-slider-runnable-track {
          background-color: var(--track-color);
          height: var(--track-width);
        }

        .custom-range-input::-moz-range-track {
          background-color: var(--track-color);
          height: var(--track-width);
        }

        .custom-range-input::-webkit-slider-thumb {
          background: var(--txtc);
          width: var(--thumb-size);
          height: var(--thumb-size);
        }

        .custom-range-input::-moz-range-thumb {
          background-color: var(--txtc);
          background:var(--txtc);
          width: var(--thumb-size);
          height: var(--thumb-size);
        }

        /* Marker styles */
        .value-marker {
          position: absolute;
          top: -25px;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};





export default Input;

