import React, { useState, useEffect } from 'react';
import './style.css';
import Month from './month';

const Calendar = ({ myCalender, showEventDetails }) => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  const monthsInYear = Array.from({ length: 12 }, (_, index) => index + 1);

  const setMonth = (event) => {
    const selectedMonthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(selectedMonthIndex);
    setSelectedEvent(null); // Reset selectedEvent when changing the month
    fetchEvents(selectedYear, selectedMonthIndex);
  };

  const setYear = (event) => {
    const selectedYearValue = parseInt(event.target.value, 10);
    setSelectedYear(selectedYearValue);
    setSelectedEvent(null); // Reset selectedEvent when changing the year
    fetchEvents(selectedYearValue, selectedMonth);
  };

  const toggleFullEventView = (event) => {
    setSelectedEvent(selectedEvent === event ? null : event);
  };

  const fetchEvents = async (year, month) => {
    // Fetch events from the store or external API based on the selected year and month
    // Example: const eventsToDisplay = await fetchEventsFromStore(year, month);
    // Update the displayedEvents state accordingly
    // setDisplayedEvents(eventsToDisplay);
  };

  useEffect(() => {
    fetchEvents(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <select value={selectedMonth} onChange={setMonth}>
          {monthsInYear.map((month) => (
            <option key={month} value={month}>
              {new Date(selectedYear, month - 1, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedYear}
          onChange={setYear}
          placeholder="Year"
          min={currentDate.getFullYear() - 1}
          max={currentDate.getFullYear() + 1}
        />
      </div>
      <Month
        month={selectedMonth}
        year={selectedYear}
        events={displayedEvents}
        onEventClick={toggleFullEventView}
        showEventDetails={showEventDetails}
      />
    </div>
  );
};

export default Calendar;
