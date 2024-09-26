import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SortIcon = ({ size = 22, color = 'white'}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <Path d="M24,0V2H10V0h14ZM10,7h11v-2H10v2Zm0,5h8v-2H10v2Zm0,5h5v-2h-5v2Zm-4,4V0h-2V21l-2.5-2.5L.086,19.914l3.5,3.5c.39,.39,.902,.585,1.414,.585s1.024-.195,1.414-.585l3.5-3.5-1.414-1.414-2.5,2.5Z"/>
  </Svg>
);

export default SortIcon;
