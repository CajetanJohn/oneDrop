// Playtime.js
import React from 'react';

const Playtime = ({ hours, minutes, seconds }) => {
  return (
    <div className="playtime">
      <h3>Playtime Data:</h3>
      <p>{`${hours} hours, ${minutes} minutes, ${seconds} seconds`}</p>
    </div>
  );
};

export default Playtime;
