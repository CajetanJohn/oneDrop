// ThreeDotsVerticalIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Menu = ({ size = 24, color = 'black', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
    {...props}
  >
    <Path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  </Svg>
);

export default Menu;