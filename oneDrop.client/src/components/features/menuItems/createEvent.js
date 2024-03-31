import React, { useState } from 'react';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventDetails: {
      location: {
        coordinates: ['', ''],
        locationName: '',
      },
      date: '',
      time: '',
      entranceFee: {
        isFree: true,
        options: [{ categoryName: '', price: '' }],
      },
    },
    appearances: [],
    configuration: {
      requests: [
        {
          music: {
            allowed: true,
            genre: '',
            pricePerRequest: false,
            maxRequests: 0,
            totalRequest: 0,
          },
        },
      ],
      dressingCode: {
        attire: '',
      },
    },
  });

  const handleInputChange = (field, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setEventData((prevData) => ({
      ...prevData,
      eventDetails: {
        ...prevData.eventDetails,
        location: {
          ...prevData.eventDetails.location,
          [field]: value,
        },
      },
    }));
  };

  const handleTimeChange = (e) => {
    handleInputChange('eventDetails.time', e.target.value);
  };

  const handleFreeToggle = (isFree) => {
    setEventData((prevData) => ({
      ...prevData,
      eventDetails: {
        ...prevData.eventDetails,
        entranceFee: {
          isFree: isFree,
          options: isFree ? [] : [{ categoryName: '', price: '' }],
        },
      },
    }));
  };

  const handleAppearancesChange = (value) => {
    setEventData((prevData) => ({
      ...prevData,
      appearances: value,
    }));
  };

  const handleConfigurationChange = (field, value) => {
    setEventData((prevData) => ({
      ...prevData,
      configuration: {
        ...prevData.configuration,
        [field]: value,
      },
    }));
  };

  const handleAddOption = () => {
    setEventData((prevData) => ({
      ...prevData,
      eventDetails: {
        ...prevData.eventDetails,
        entranceFee: {
          ...prevData.eventDetails.entranceFee,
          options: [...prevData.eventDetails.entranceFee.options, { categoryName: '', price: '' }],
        },
      },
    }));
  };

  const handleInsert = async () => {
    try {
      const response = await fetch('http://localhost:5000/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log('Event inserted successfully');
      } else {
        console.error('Failed to insert event:', response);
      }
    } catch (error) {
      console.error('Error inserting event:', error);
    }
  };

  return (
    <div>
      <label>
        Location Coordinates:
        <input
          type="text"
          value={eventData.eventDetails.location.coordinates.join(',')}
          onChange={(e) => handleLocationChange('eventDetails.location.coordinates', e.target.value.split(','))}
        />
      </label>
      <br />

      <label>
        Location Name:
        <input
          type="text"
          value={eventData.eventDetails.location.locationName}
          onChange={(e) => handleLocationChange('eventDetails.location.locationName', e.target.value)}
        />
      </label>
      <br />

      <label>
        Date:
        <input
          type="date"
          value={eventData.eventDetails.date}
          onChange={(e) => handleInputChange('eventDetails.date', e.target.value)}
        />
      </label>
      <br />

      <label>
        Time:
        <select value={eventData.eventDetails.time} onChange={handleTimeChange}>
          {Array.from({ length: 48 }).map((_, index) => {
            const hours = Math.floor(index / 2);
            const minutes = index % 2 === 0 ? '00' : '30';
            const time = `${hours}:${minutes}`;
            return <option key={index} value={time}>{time}</option>;
          })}
        </select>
      </label>
      <br />

      <label>
        Entrance Fee:
        <input
          type="checkbox"
          checked={eventData.eventDetails.entranceFee.isFree}
          onChange={() => handleFreeToggle(!eventData.eventDetails.entranceFee.isFree)}
        />
        Free
      </label>
      {!eventData.eventDetails.entranceFee.isFree && (
        <div>
          {eventData.eventDetails.entranceFee.options.map((option, index) => (
            <div key={index}>
              <label>
                Ticket Category:
                <input
                  type="text"
                  value={option.categoryName}
                  onChange={(e) => handleInputChange(`eventDetails.entranceFee.options.${index}.categoryName`, e.target.value)}
                />
              </label>
              <label>
                Ticket Price:
                <input
                  type="number"
                  value={option.price}
                  onChange={(e) => handleInputChange(`eventDetails.entranceFee.options.${index}.price`, e.target.value)}
                />
                </label>
            </div>
          ))}
          <button onClick={handleAddOption}>Add Ticket Option</button>
        </div>
      )}

      <label>
        Appearances (comma-separated):
        <input
          type="text"
          value={eventData.appearances.join(',')}
          onChange={(e) => handleAppearancesChange(e.target.value.split(','))}
        />
        <div>
          Debugging Appearances Input:
          <pre>{JSON.stringify(eventData.appearances, null, 2)}</pre>
        </div>
      </label>
      <br />

      {/* Configuration Inputs */}
      <label>
        Music Genre:
        <input
          type="text"
          value={eventData.configuration.requests[0].music.genre}
          onChange={(e) => handleConfigurationChange('configuration.requests.0.music.genre', e.target.value)}
        />
      </label>
      {/* Add other configuration inputs similarly */}

      <button onClick={handleInsert}>Insert Event</button>
    </div>
  );
};

export default CreateEvent;
