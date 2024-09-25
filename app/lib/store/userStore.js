import { makeAutoObservable, runInAction } from "mobx";
import * as Location from 'expo-location';
import * as RNLocalize from "react-native-localize";
import Geocoding from 'react-native-geocoding'; // Import the geocoding library

class UserStore {
  location = {
    coordinates: {
      latitude: null,
      longitude: null,
      accuracy: null,
      speed: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
    },
    country: null,
    city: null,
  };

  constructor() {
    makeAutoObservable(this);
    Geocoding.init("YOUR_GOOGLE_MAPS_API_KEY"); // Initialize with your API key
    this.requestLocationPermission();
  }

  // Request location permission
  async requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Location permission denied");
      return;
    }
    this.startTrackingLocation();
  }

  // Action to set the location
  setLocation = (coords) => {
    runInAction(() => {
      this.location.coordinates = { ...coords };
      this.location.country = coords.country;
      this.location.city = coords.city;
    });
    console.log("Updated Location Store: ", this.location); // Log the entire store when updated
  };

  // Function to get current location and update state
  async startTrackingLocation() {
    // Get the current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    // Set the location with the current position
    this.getCountryAndCity(location.coords);
    
    // Start watching the position
    Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      distanceInterval: 0, // Minimum distance to change location
      timeInterval: 10000, // Minimum time interval to change location
    }, (position) => {
      this.getCountryAndCity(position.coords);
    });
  }

  // Function to get country and city from coordinates
  async getCountryAndCity(coords) {
    const { latitude, longitude, accuracy, speed, altitude, altitudeAccuracy, heading } = coords;
    
    // Using RNLocalize to fetch country based on coordinates
    const country = RNLocalize.getCountry();
    const city = await this.getCityFromCoordinates(latitude, longitude); // Fetch city based on coordinates

    this.setLocation({
      latitude,
      longitude,
      accuracy,
      speed,
      altitude,
      altitudeAccuracy,
      heading,
      country,
      city,
    });
  }

  // Function to get city based on coordinates using react-native-geocoding
  async getCityFromCoordinates(latitude, longitude) {
    try {
      const response = await Geocoding.from(`${latitude},${longitude}`);
      const city = response.results[0].address_components.find(component => component.types.includes("locality"));
      return city ? city.long_name : "Unknown City"; // Return the city name or a default value
    } catch (error) {
      console.error("Error fetching city: ", error);
      return "Unknown City"; // Return a default value in case of an error
    }
  }
}

export const userStore = new UserStore();
