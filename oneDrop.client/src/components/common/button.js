import { useState, useEffect } from "react";
export const Primarybutton=({onClick, children, ...rest})=>{
    return <button className="p-btn" {...rest} onClick={onClick}> {children} </button>
}

export const Secondarybutton = ({ children, onClick, isActive }) => {
  
  
    return (
      <button className={`s-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
        {children}
      </button>
    );
  };


  
export const CreateButton = ({onClick, children, ...rest})=>{
    return <button className="create-btn" onClick={onClick} {...rest} >{children}</button>
}


export const LoadingButton = ({ text, error, loading, disabled, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(error !== '');
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    setIsError(error !== '' || false);
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isLoading && !isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div className="sign-btn">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        className={`loading-button ${isError ? 'error' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={handleClick}
        disabled={isLoading || isDisabled}
      >
        {isLoading && <div className="loader" />}
        <div>{text}</div>
      </button>
      <style jsx='true'>{`
        .sign-btn{
          margin:20px 0 10px 0;
        }
        .error-message {
          color: var(--invalid-txtc);
          pointer-events: none;
          width: 100%;
          font-size: 0.7rem;
          margin: 0px 0 10px 0;
        }
        .loading-button {
          background: var(--btn-bg);
          min-width: fit-content;
          width: 100%;
          padding: 5px 10px;
          border: none;
          outline: none;
          cursor: pointer;
          color: var(--txtc);
          border: 2px solid var(--btn-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 1rem;
          gap: 10px;
          box-shadow: none;
          margin: 0px 0 10px 0;
          background-color: transparent;
        }
        .loading-button.error {
          border: 2px solid red;
          cursor: not-allowed;
        }

        .loader {
          background: none;
          border: 3px solid var(--btn-bg);
          border-top: 3px solid var(--txtc);
          border-radius: 50%;
          width: 15px;
          height: 15px;
          animation: spin 2s linear infinite;
          border-bottom: 3px solid var(--txtc);
          border-left: 3px solid var(--txtc);
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};





