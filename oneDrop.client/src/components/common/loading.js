import React, {useEffect, useState} from 'react';

const Loading = ({ loading }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(loading);
    }, [loading])
    
  return (
    isLoading && (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <style jsx>
            {`
            .loading-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
              }
              
              .loading-spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: var(--txtc);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
              }
              
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }              
            `}
        </style>
      </div>
    )
  );
};

export default Loading;
