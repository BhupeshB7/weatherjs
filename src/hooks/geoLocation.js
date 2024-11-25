import { useEffect, useState } from "react";

// Custom hook to get the user's current geolocation
export function useGeolocation() {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  // Function to fetch the user's current location
  const getLocation = () => {
    // Reset error and set loading to true before attempting to fetch location
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    // Check if the Geolocation API is available in the browser
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // Attempt to get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // On success, extract latitude and longitude from the position object
        const { latitude, longitude } = position.coords;

        // Update the state with the coordinates and set loading to false
        setLocationData({
          coordinates: {
            lat: latitude,
            lon: longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        // Define error messages based on the error code returned
        let errorMessage;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission was denied. Please enable it in settings and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }

        // Update the state with the error message and set loading to false
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,  // Request high accuracy if available
        timeout: 5000,             // Set a timeout to avoid indefinite loading
        maximumAge: 0,             // Ensure no cached location is used
      }
    );
  };

  // useEffect to call getLocation on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Return the state and the getLocation function to allow manual re-fetching of the location
  return {
    ...locationData,
    getLocation,
  };
}
