import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeartCheckedIcon = ({ size = 24, color = 'white' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m9.386,3.771l-.929-1.473c-.295-.467-.155-1.084.312-1.379h0c.467-.294,1.084-.155,1.379.312l.913,1.448c.585-.279,1.227-.489,1.938-.593v-1.087c0-.552.448-1,1-1s1,.448,1,1v1.082c.636.095,1.195.294,1.693.576l.92-1.38c.306-.46.927-.584,1.387-.277s.584.927.277,1.387l-1.37,2.055c-3.334.802-5.404,2.491-6.351,3.657-.822-.817-2.191-1.801-4.149-2.042.456-.713,1.118-1.552,1.978-2.286Zm13.608,2.232l-1.043-.002c-7.37,0-9.315,4.017-9.395,4.188-.109,1.832-1.064,4.625-3.906,6.378-.441.272-1.015.17-1.337-.236-.004-.005-.009-.011-.013-.016-.368-.467-.203-1.144.304-1.454,2.618-1.597,2.894-4.075,2.906-4.947-.486-.596-1.643-1.696-3.511-1.873v-.039C7,2.605,3.203.421,1.196.02.658-.087.135.26.023.799c-.111.539.237,1.066.774,1.181.172.036,4.202.95,4.202,6.021v.313c-1.718.695-2.984,2.511-2.997,4.654.032,5.049,4.254,9.403,10.53,10.846.545.125,1.055.188,1.535.188.609,0,1.17-.101,1.693-.303,3.112-1.206,4.739-5.54,4.738-9.198,0-2.005-.486-3.078-.955-4.116-.085-.188-.172-.38-.258-.583-.255-.6-.113-.812-.066-.881.174-.26,1.061-.812,3.799-.903.543-.018.981-.463.981-1.006,0-.556-.45-1.007-1.006-1.009Z"
      fill={color}
    />
  </Svg>
);

export default HeartCheckedIcon;
