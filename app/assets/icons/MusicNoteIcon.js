import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MusicNoteIcon = ({ size = 24, color = 'black', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <Path d="M20 0h-2.5c-2.481 0-4.5 2.019-4.5 4.5v9.761c-.952-.787-2.172-1.261-3.5-1.261-3.032 0-5.5 2.468-5.5 5.5s2.468 5.5 5.5 5.5 5.5-2.468 5.5-5.5V4.5c0-1.379 1.121-2.5 2.5-2.5h2.5c.553 0 1-.447 1-1s-.447-1-1-1Zm-10.5 22c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5Z"/>
  </Svg>
);

export default MusicNoteIcon;
