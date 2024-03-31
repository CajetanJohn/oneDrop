import React, { useState, useEffect } from 'react';

const IndividualEvent = ({ event, onClick }) => {

  const checkEventTiming = () => {
    const eventDate = new Date(event.eventDetails.date);
    const currentDate = new Date();

    // Calculate time difference in milliseconds
    const timeDifference = eventDate.getTime() - currentDate.getTime();

    // Check if the event is happening today
    if (eventDate.toDateString() === currentDate.toDateString()) {
      // Notify when there's 1 hour remaining
      if (timeDifference <= 3600000 && timeDifference > 0) {
        alert(`1 hour remaining for event '${event.eventDetails.location.locationName}'`);
      }

      // Notify when the event starts
      if (timeDifference <= 0) {
        alert(`Event '${event.eventDetails.location.locationName}' is starting now!`);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkEventTiming();
    }, 1000 * 60); // Check every minute, adjust as needed

    return () => clearInterval(intervalId); // Clear interval on component unmount

  }, []); // No dependencies, so it runs once on mount

  return (
    <li key={event._id} onClick={()=>onClick({'eventId':event._id,'date':event.eventDetails.date})} style={{ textDecoration: 'none' }}>
      {event._id} {event.eventDetails.location.locationName}
    </li>
  )
};




const EventList = ({userEvents, showEventDetails }) => {
  const [events, setEvents] = useState([]);


  useEffect(() => {

    const fetchEventsFromDatabase = async () => {
      try {
        // Extract event ids from the array
        const eventIds = userEvents.map((event) => event.id);

        // Fetch events from the database using the array of ids
        const apiUrl = `http://localhost:5000/findEvent?id=${eventIds.join(',')}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsFromDatabase();
  }, []); // No dependencies, so it runs once on mount

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event)=>(<IndividualEvent key={event.id} event={event} onClick={() => showEventDetails} />))}
      </ul>
    </div>
  );
};


export default EventList;
