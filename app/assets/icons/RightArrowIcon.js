import React from 'react';
import Svg, { Path } from 'react-native-svg';

const RightArrowIcon = ({ size = 23, color = 'black' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8.127,24l9.507-9.52a3.507,3.507,0,0,0,0-4.948L8.116,0L6,2.121l9.518,9.531a.5.5,0,0,1,0,.707L6.01,21.879Z"
      fill={color}
    />
  </Svg>
);

export default RightArrowIcon;
