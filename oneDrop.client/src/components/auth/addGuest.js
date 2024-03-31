// GuestComponent.js
import React, { useState } from 'react';

const AddGuest = () => {
  const [guestData, setGuestData] = useState({
    guestId: '',
    name: '',
    date: '',
    requests: '',
  });

  const handleInputChange = (field, value) => {
    setGuestData({
      ...guestData,
      [field]: value,
    });
  };

  const handleInsert = async () => {
    try {
      const response = await fetch('http://localhost:5000/addGuest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestData),
      });

      if (response.ok) {
        console.log('Guest inserted successfully');
      } else {
        console.error('Failed to insert guest:', response);
      }
    } catch (error) {
      console.error('Error inserting guest:', error);
    }
  };

  return (
    <div>
      <label>
        Guest ID:
        <input
          type="text"
          value={guestData.guestId}
          onChange={(e) => handleInputChange('guestId', e.target.value)}
        />
      </label>
      <br />

      <label>
        Name:
        <input
          type="text"
          value={guestData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </label>
      <br />

      <label>
        Date:
        <input
          type="date"
          value={guestData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </label>
      <br />

      <label>
        Requests:
        <input
          type="text"
          value={guestData.requests}
          onChange={(e) => handleInputChange('requests', e.target.value)}
        />
      </label>
      <br />

      <button onClick={handleInsert}>Insert Guest</button>
    </div>
  );
};

export default AddGuest;
