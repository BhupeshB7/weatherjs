// weather.js
import { API_CONFIG } from "../api/config.js";
class Weather {
  createUrl(endpoint, params) {
    let searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    console.log(`${endpoint}?${searchParams.toString()}`);
    return `${endpoint}?${searchParams.toString()}`;
  }

  async fetchData(url, retries = 5, timeout = 3000) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      clearTimeout(controller.signal.timeout);
      return data;
    } catch (error) {
      clearTimeout(controller.signal.timeout);
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      if (error.message.includes("Network Error")) {
        throw new Error("Network Error, please check your internet connection");
      }
      if (retries > 0) {
        console.log("Retrying...");
        return this.fetchData(url, retries - 1, timeout);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
  }

  async getCurrentWeather({ lat, lon }) {
    try {
      const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: "metric",
      });
      const data = await this.fetchData(url);
      return data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  }
  async getForecast({ lat, lon }) {
    try {
      const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: "metric",
      });
      const data = await this.fetchData(url);
      return data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  }
  async reverseGeocode({ lat, lon }) {
    try {
      const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: "metric",
      });
      const data = await this.fetchData(url);
      return data;
    } catch (error) {
      console.error("Error fetching reverse geocode:", error);
      throw error;
    }
  }
  async searchLocation({ lat, lon, query }) {
    try {
      const url = this.createUrl(`${API_CONFIG.GEO}/search`, {
        lat: lat.toString(),
        lon: lon.toString(),
        query: query,
        units: "metric",
      });
      const data = await this.fetchData(url);
      return data;
    } catch (error) {
      console.error("Error fetching search location:", error);
      throw error;
    }
  }
  async getCurrentAirQuality({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.BASE_AIR_URL}/air_pollution`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    try {
      const data = await this.fetchData(url);
      return data;
    } catch (error) {
      console.error("Error fetching current air quality:", error);
      throw error;
    }
  }
}

export const weatherApi = new Weather();

// (async () => {
//   try {
//     const data = await weatherApi.getCurrentWeather({
//       lat: 28.6139,
//       lon: 77.209,
//     });
//     // console.log(data);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// })();

(async () => {
  try {
    const data = await weatherApi.getForecast({
      lat: 28.6139,
      lon: 77.209,
    });
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Error fetching current air quality:", error);
  }
})();
