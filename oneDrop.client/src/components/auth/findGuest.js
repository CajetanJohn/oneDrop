// GuestList.js
import React, { useState, useEffect } from 'react';

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('http://localhost:5000/findGuest');
        if (response.ok) {
          const data = await response.json();
          setGuests(data);
        } else {
          console.error('Failed to fetch guests:', response);
        }
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  return (
    <div>
      <h2>Guest List</h2>
      {guests.length === 0 ? (
        <p>No guests present.</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest._id}>
              <strong>Guest ID:</strong> {guest.guestId} | <strong>Name:</strong> {guest.name} |{' '}
              <strong>Date:</strong> {new Date(guest.date).toLocaleDateString()} |{' '}
              <strong>Requests:</strong> {guest.requests}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestList;
