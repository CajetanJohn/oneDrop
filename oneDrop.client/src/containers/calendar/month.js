import React from 'react';
import Day from './day';

const Month = ({ month, year, events, showEventDetails }) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 is Sunday, 1 is Monday, ...
  const lastDayOfMonth = new Date(year, month, 0).getDay(); // Last day of the month

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate the number of days from the previous and next months to fill the table
  const daysBeforeMonth = firstDayOfMonth;
  const daysAfterMonth = 6 - lastDayOfMonth;

  // Calculate the days in the previous month
  const previousMonth = month === 1 ? 12 : month - 1;
  const daysInPreviousMonth = new Date(year, month - 1, 0).getDate();

  // Calculate the days in the next month
  const nextMonth = month === 12 ? 1 : month + 1;

  return (
    <table className="month">
      <thead>
        <tr>
          {daysOfWeek.map((day) => (
            <th key={day} className="weekday">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <tr key={weekIndex} className="week">
            {daysOfWeek.map((weekday, dayIndex) => {
              const day = weekIndex * 7 + dayIndex - daysBeforeMonth + 1;
              const isInPreviousMonth = day <= 0;
              const isInNextMonth = day > daysInMonth;

              return (
                <td
                  key={day}
                  className={`day-cell ${isInPreviousMonth || isInNextMonth ? 'other-month' : ''}`}
                  style={{
                    backgroundColor: isInPreviousMonth || isInNextMonth ? 'green' : 'inherit',
                    borderColor: 'green',
                  }}
                >
                  {isInPreviousMonth && (
                    <Day month={previousMonth} day={daysInPreviousMonth + day} year={year} isOtherMonth showEventDetails={showEventDetails} events={events}/>
                  )}

                  {!isInPreviousMonth && !isInNextMonth && (
                    <Day month={month} day={day} year={year} events={events} isCurrentDay={isCurrentDay(month, day, year)} showEventDetails={showEventDetails}/>
                  )}

                  {isInNextMonth && (
                    <Day month={nextMonth} day={day - daysInMonth} year={year} isOtherMonth showEventDetails={showEventDetails} events={events}/>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const isCurrentDay = (month, day, year) => {
  const today = new Date();
  return today.getMonth() + 1 === month && today.getDate() === day && today.getFullYear() === year;
};

export default Month;
