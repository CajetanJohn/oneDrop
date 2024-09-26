import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftArrowIcon = ({ size = 23, color = 'black' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.041,24L6.534,14.48a3.507,3.507,0,0,1,0-4.948L16.052,0L18.17,2.121L8.652,11.652a.5.5,0,0,0,0,.707l9.506,9.52Z"
      fill={color}
    />
  </Svg>
);

export default LeftArrowIcon;
