// Define your themes
const themes = {
  light: {
    name:'light',

    background: '#F7F6F4',
    secondaryBackground:"white",
    tertiaryBackground:'#DFDFDF',

    iconColor: '#20201E',
    secondaryIconColor: '#FAFAFA',
    dividerColor:'#20201E',
    textColor: '#20201E',
    fadedText:"#CCCCCE",

    statusBarStyle: 'dark-content',

    popUpBackground:"#FCFCFE",
    borderColor:"#DCDCDE",
    shadowColor:"",
    errorColor:"red",


    headerBackgroundColor: '#F7F6F4',
    specialIconColor:'red',
    backgroundImage: null,

    tinyFont:12,
    smallFont:15,
    mediumFont:20,
    largeFont:25,
    XlargeFont:28,

    modalColor: '#F0F0F0', // Example value
    alertColor: '#FF0000', // Example value
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Example value
    borderColor: '#DDDDDD', // Example value
    tintColor: '#CCCCCC', // Example value
  },
  dark: {
    name:'dark',

    background: '#000000',
    secondaryBackground:"#171717",
    tertiaryBackground:'#454545',
    fadedText:"#CCCCCE",

    tinyFont:13,
    smallFont:15,
    mediumFont:20,
    largeFont:25,
    XlargeFont:28,



    iconColor: '#D5D5D5',
    secondaryIconColor: '#FAFAFA',
    textColor: '#D5D5D5',
    specialIconColor:'red',

    statusBarStyle:"light--content",

    popUpBackground:"#3A3A3C",
    borderColor:"#3A3A3C",
    shadowColor:"",
    errorColor:"red",

    dividerColor:'grey',
    drawerBackgroundColor: '#000000',
    headerBackgroundColor: '#000000',
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
    drawerBackgroundColor: '#FF5733',
    headerBackgroundColor: '#FF5733',
    specialIconColor:'red',
    color: '#FFF700',
    backgroundImage: 'url-to-light-image.jpg',
    textColor: '#FFF700', // Example value
    modalColor: '#FFAA00', // Example value
    alertColor: '#FF0000', // Example value
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Example value
    borderColor: '#FF6600', // Example value
    tintColor: '#FF3300', // Example value
  },
};

export default themes;
