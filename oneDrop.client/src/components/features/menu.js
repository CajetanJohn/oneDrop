import React, { useState } from 'react';
import Account from './menuItems/myAccount';
import Settings from './menuItems/settings';
import Share from './menuItems/Share';
import Logout from './menuItems/logOut';
import CreateEvent from './menuItems/createEvent';
import Stats from './menuItems/stats';
import History from './menuItems/myHistory';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/icons';

export const Menu = ({ onClose }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const sessionId = useSelector((state) => state.session._id);
  const [isUserSignedIn] = useState(sessionId && user._id);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null);
    setMessage(null); // Reset the message when going back
  };

  const SignIn = ({message})=>{
    navigate('./signin');
  }

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case 'my account':
        return isUserSignedIn ? <Account /> : <SignIn message="Cannot open account details as you are not signed in." />;
      case 'configurations':
        return isUserSignedIn ? <Settings /> : <SignIn message="Cannot open configurations as you are not signed in." />;
      case 'Share':
        return <Share />;
      case 'logOut':
        return isUserSignedIn ? <Logout /> : null;
      case 'my past':
        return isUserSignedIn ? <History /> : <SignIn message="Cannot view history as you are not signed in." />;
      case 'add your event':
        return isUserSignedIn ? <CreateEvent /> : <SignIn message="Cannot add an event as you are not signed in." />;
      case 'statistics':
        return isUserSignedIn ? <Stats /> : <SignIn message="Cannot view statistics as you are not signed in." />;
      default:
        return null;
    }
  };

  const renderCloseButton = () => {
    // Render a single button that toggles between closing the menu and going back
    return (
      <button className='p-btn' onClick={selectedItem ? handleBackButtonClick : onClose}>
        {selectedItem ? 'Back to Menu' : 'Close'}
      </button>
    );
  };

  return (
    <div className="modal z1">
      <div className="modal-content">
        {renderCloseButton()}
        {selectedItem ? (
          <div>
            {renderSelectedItem()}
          </div>
        ) : (
          <div>
            <h2>Menu</h2>
            <ul>
              {['my account', 'add your event', 'configurations', 'my past', 'statistics', 'Share', 'logOut'].map((item) => (
                <li className='menu-item c-p' key={item} onClick={() => handleItemClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
            <span style={{'marginTop': 'auto'}} onClick={() => handleItemClick('my account')}>{user.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const MenuButton = ({ onClick }) => {
  return (
    <Icon onClick={onClick} name={'menu_button'} width="30" height="30"/>
  );
};
