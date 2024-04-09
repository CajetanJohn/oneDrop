import React from 'react';

const ButtonModal = ({ isOpen, toggleButton, children, ...props }) => {
  return (
    <div className={`bottom-modal-container ${isOpen ? 'slide-in' : 'slide-out'}`} {...props}>
      {children}
      <style jsx>{`
        .bottom-modal-container {
          position: fixed;
          bottom: ${isOpen ? '0' : '-100%'}; /* Slide down when closed */
          left: 0;
          transition: bottom 0.5s ease;
        }

        .slide-in {
          animation: slideIn 0.5s forwards; /* Apply slide-in animation */
        }

        .slide-out {
          animation: slideOut 0.5s forwards; /* Apply slide-out animation */
        }

        @keyframes slideIn {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonModal;
