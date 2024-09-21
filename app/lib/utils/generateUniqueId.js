import UUID from 'react-native-uuid';

// Function to generate a unique ID
export default function generateUniqueId (){
  return UUID.v4();
};
