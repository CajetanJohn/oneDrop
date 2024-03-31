// SongInputComponent.js
import React, { useState } from 'react';

const SongInputComponent = () => {
  const [songName, setSongName] = useState('');

  const handleInputChange = (e) => {
    setSongName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songName }),
      });

      if (response.ok) {
        console.log('Song data sent successfully');
      } else {
        console.error('Failed to send song data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SongInputComponent;
