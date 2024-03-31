import React, { useState } from 'react';
import BuyTicket from '../components/features/buyTicket';
import Request from '../components/features/request';
import { useSelector } from 'react-redux';

const FullEvent = ({ event, onClose }) => {
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.allEvents);
  const [view, setView] = useState('fullEvent');
  const specificEvent = events.find((e) => e._id === event.eventId);

  const {
    locationName,
    date,
    time,
    _id: eventId,
    configuration: {
      stats: { guest: { id: guestId } },
      requests: [{ music: { allowed: isMusicRequestAllowed } }],
    },
    eventDetails: { entranceFee: { isFree: isFreeEvent } },
  } = specificEvent || {};

  const isUserMember = guestId.includes(user?._id);

  const handleRequestClick = () => setView('request');
  const handleBuyTicketClick = () => setView('buyTicket');
  const handleBackClick = () => setView('fullEvent');
  const handleNextClick = () => {
    // Add logic for handling next button click if needed
  };

  return (
    <div>
      {view === 'fullEvent' && (
        <div>
          <h2>{locationName}</h2>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>{eventId}</p>
          <button onClick={onClose}>Close</button>
          {isUserMember && !isFreeEvent && (
            <button onClick={handleBuyTicketClick}>Buy ticket</button>
          )}
          {(!isUserMember || isFreeEvent) && (
            <button onClick={handleBuyTicketClick} disabled={isUserMember}>
              Buy Ticket
            </button>
          )}
          {isMusicRequestAllowed && (
            <button onClick={handleRequestClick}>Request</button>
          )}
        </div>
      )}
      {view === 'request' && (
        <Request onClose={onClose} onBack={handleBackClick} onNext={handleNextClick} isUserMember={isUserMember} isFreeEvent={isFreeEvent} />
      )}
      {view === 'buyTicket' && (
        <BuyTicket onClose={onClose} onBack={handleBackClick} onNext={handleNextClick} />
      )}
    </div>
  );
};

export default FullEvent;
