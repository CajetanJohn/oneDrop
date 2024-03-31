
import { useState, useCallback } from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import { MenuButton } from './menu';
import Icon from '../../assets/icons/icons';
import Search from './search/search';
import Modal from '../../containers/modal';
import { CreateButton, Primarybutton, Secondarybutton } from '../common/button';

export const TopNav = () => {
  const [activeButton, setActiveButton] = useState('/myEvents'); // Initial active button

  const goToPage = useNavigate();

  const handleButtonClick = (page) => {
    setActiveButton(page);
    //goToPage(page);
  };

  return (
    <div className="top-nav">
      <div className="top-div">
        <button>Right Button</button>
        <div>Default Text</div>
      </div>

      <div className="bottom-div">
        <Secondarybutton onClick={() => handleButtonClick('/myEvents')} isActive={activeButton === '/myEvents'}>
          For You
        </Secondarybutton>
        <Secondarybutton onClick={() => handleButtonClick('/allEvents')} isActive={activeButton === '/allEvents'}>
          Happening
        </Secondarybutton>
      </div>
    </div>
  );
};


export const LowerNav = () => {
  const goToPage = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleHomeClick = () => {
    if (location.pathname === '/app') {
      return (
        <>
          <Icon name={activeIcon === 'list' ? "listActive" : "list"} onClick={() => handleIconClick('list', () => goToPage('/listing'))}></Icon>
          <Icon name={!activeIcon === 'calendar' ? "calendarActive" : "calendar"} onClick={() => handleIconClick('calendar', () => goToPage('/calendar'))}></Icon>
        </>
      );
    } else {
      return (
        <button onClick={() => goToPage('/app')} className={activeIcon === 'home' ? 'active' : ''}> home </button>
      );
    }
  };

  const handleCreateEventClick = () => {
    setShowModal(true);
    setActiveIcon('create');
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveIcon(null);
  };

  const handleModalButtonClick = (route) => {
    goToPage(route);
    closeModal();
  };

  const handleIconClick = (iconName, callback) => {
    setActiveIcon(iconName);
    console.log(activeIcon);
    callback();
  };

  return (
    <div className="lower-nav-bar">
      <CreateButton onClick={handleCreateEventClick}>
        <Icon name={activeIcon==="create" ? "create" : ""} className={activeIcon === 'create' ? 'active' : ''}></Icon>
      </CreateButton>
      {handleHomeClick()}
      <Icon name={activeIcon === 'search' ? "searchActive" : "search"} onClick={() => handleIconClick('search', () => goToPage('/search'))}></Icon>
      <Icon name={activeIcon === 'qr_code' ? "qr_codeActive" : "qr_code"} onClick={() => handleIconClick('qr_code')} ></Icon>

      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleModalButtonClick('/requestSong')}>Request Song</button>
          <button onClick={() => handleModalButtonClick('/createEvent')}>Create Event</button>
          <button onClick={() => handleModalButtonClick('/scanQRCode')}>Scan QR Code</button>
        </div>
      </Modal>
    </div>
  );
};

export default LowerNav;


