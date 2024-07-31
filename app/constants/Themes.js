// Define your themes
const themes = {
  light: {
    name:'light',
    iconColor: '#000000',
    background: '#FFFFFF',
    color: '#000000',
    specialIconColor:'red',
    backgroundImage: null,
    textColor: '#000000', // Example value
    modalColor: '#F0F0F0', // Example value
    alertColor: '#FF0000', // Example value
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Example value
    borderColor: '#DDDDDD', // Example value
    tintColor: '#CCCCCC', // Example value
  },
  dark: {
    name:'dark',
    iconColor: '#FFFFFF',
    background: '#000000',
    color: '#FFFFFF',
    specialIconColor:'red',
    backgroundImage: null,
    textColor: '#FFFFFF', // Example value
    modalColor: '#333333', // Example value
    alertColor: '#FF0000', // Example value
    shadowColor: 'rgba(255, 255, 255, 0.2)', // Example value
    borderColor: '#444444', // Example value
    tintColor: '#666666', // Example value
  },
  custom: {
    name:'custom',
    iconColor: '#FFF700',
    background: '#FF5733',
    specialIconColor:'red',
    color: '#FFF700',
    backgroundImage: 'url-to-light-image.jpg',
    textColor: '#000000', // Example value
    modalColor: '#FFAA00', // Example value
    alertColor: '#FF0000', // Example value
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Example value
    borderColor: '#FF6600', // Example value
    tintColor: '#FF3300', // Example value
  },
};

export default themes;
