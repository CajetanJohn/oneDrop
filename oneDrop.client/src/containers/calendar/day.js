import { useDispatch, useSelector } from 'react-redux';

const Day = ({ month, day, year, events, isCurrentDay, showEventDetails }) => {
  const allEvents = useSelector((state) => state.event);

  const eventsForDay = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() + 1 === month &&
      eventDate.getDate() === day &&
      eventDate.getFullYear() === year
    );
  });

  const openEvent = (event) => {
    //const matchedEvent =allEvents.find((stateEvent) => stateEvent._id === event.id)
    return showEventDetails(event)
  };

  return (
    <div className={`day ${isCurrentDay ? 'current-day' : ''}`}>
      {eventsForDay.length > 0 ? (
        <div className="event-date" onClick={() => openEvent(eventsForDay[0])}>
          <p>{day}</p>
        </div>
      ) : (
        <p>{day}</p>
      )}

      {eventsForDay.map((event, index) => (
        <div key={index} className="event" onClick={() => openEvent(event)}>
          {event.image && <img src={event.image} alt={`Event ${index}`} />}
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Day;
