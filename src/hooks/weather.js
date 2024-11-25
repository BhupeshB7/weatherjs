import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const weatherQueryKey = {
  weather: ["weather"],
  forecast: ["forecast"],
  airQuality: ["airQuality"],
  searchLocation: ["searchLocation"],
  reverseGeocode: ["reverseGeocode"],
};

export const useWeather = (coordinates) => {
  return useQuery({
    queryKey: [...weatherQueryKey.weather, coordinates], // Add coordinates here
    queryFn: () => weatherApi.getCurrentWeather(coordinates),
    enabled: !!coordinates,
  });
};

export const useForecast = (coordinates) => {
  return useQuery({
    queryKey: [...weatherQueryKey.forecast, coordinates], // Add coordinates here
    queryFn: () => weatherApi.getForecast(coordinates),
    enabled: !!coordinates,
  });
};

export const useAirQuality = (coordinates) => {
  return useQuery({
    queryKey: [...weatherQueryKey.airQuality, coordinates], // Add coordinates here
    queryFn: () => weatherApi.getCurrentAirQuality(coordinates),
    enabled: !!coordinates,
  });
};

export const useSearchLocation = (coordinates) => {
  return useQuery({
    queryKey: [...weatherQueryKey.searchLocation, coordinates], // Add coordinates here
    queryFn: () => weatherApi.searchLocation(coordinates),
    enabled: !!coordinates,
  });
};

export const useReverseGeocode = (coordinates) => {
  return useQuery({
    queryKey: [...weatherQueryKey.reverseGeocode, coordinates], // Add coordinates here
    queryFn: () => weatherApi.reverseGeocode(coordinates),
    enabled: !!coordinates,
  });
};
