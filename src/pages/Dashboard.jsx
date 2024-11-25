import CurrentAirPollution from "@/components/CurrentAirPollution";
import CurrentWeather from "@/components/CurrentWeather";
import { HourlyTemperature } from "@/components/HourlyTemperature";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/geoLocation";
import {
  useForecast,
  useAirQuality,
  useReverseGeocode,
  useWeather,
} from "@/hooks/weather";

import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import Home from "./Home";
const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  const weatherData = useWeather(coordinates);
  const forecastData = useForecast(coordinates);
  const locationData = useReverseGeocode(coordinates);
  const useAirQualityData = useAirQuality(coordinates);
  console.log(weatherData);
  console.log(forecastData);
  console.log("locationData", locationData);
  console.log(coordinates);
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherData.refetch();
      forecastData.refetch();
      locationData.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant={"destructive"} className="mt-4 w-[90%] mx-auto   text-red-400">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit mt-3"
          >
            <MapPin className="h-6 w-6 text-red-400" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant={"destructive"} className="mt-4 w-[90%] mx-auto flex text-red-400">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location to get your current location.</p>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit mt-3"
          >
            <MapPin className="h-6 w-6 text-red-400" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationData.data?.[0].name;
  // console.log(locationName);
  if (!locationName) {
    return <WeatherSkeleton />;
  }
  if (weatherData.error || forecastData.error) {
    return (
      <Alert variant={"destructive"} className="mt-4 px-4 text-red-400">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p> Something went wrong. Please try again.</p>
          <Button
            onClick={handleRefresh}
            variant={"outline"}
            className="w-fit mt-3"
          >
            <RefreshCcw className="h-6 w-6 text-red-400" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherData.data || !forecastData.data) {
    return <WeatherSkeleton />;
  }
  return (
    <div>
      <div className=" bg-gradient-to-br from-blue-400 via-blue-200 to-blue-500 min-w-full">
        <div className="px-4 flex items-center justify-between">
          <h1 className="text-3xl pl-6 font-bold tracking-tight">{locationName}</h1>
          <Button
            variant={"outline"}
            onClick={handleRefresh}
            disabled={weatherData.isFetching || forecastData.isFetching}
            className="text-xl font-bold text-foreground py-3 px-5 m-2 rounded-full hover:bg-muted transform transition duration-200 ease-in-out hover:scale-105"
          >
            <FiRefreshCw
              className={`h-6 w-6 transition-opacity duration-200 ease-in-out hover:opacity-80 ${
                weatherData.isFetching || forecastData.isFetching
                  ? "animate-spin"
                  : ""
              }`}
            />
          </Button>
        </div>
        <Home data={weatherData.data} locationName={locationName} />
      </div>
      <div className="grid  gap-6 px-4 mt-2">
        <div className="flex flex-col-reverse lg:flex-row gap-6 justify-between items-center">
          {/* details */}
          <WeatherForecast data={forecastData.data} />
          <CurrentWeather data={weatherData.data} locationName={locationName} />
          {/* forecast */}
        </div>
      </div>
      <div className="grid gap-6 px-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* <CurrentWeather data={weatherData.data} locationName={locationName} /> */}
          <CurrentAirPollution
            data={useAirQualityData.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastData.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
