import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaWind, FaTint } from "react-icons/fa"; // Import icons from react-icons

const WeatherForecast = ({ data }) => {
  // Process API data into daily forecasts
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "EEEE"); // Day of the week

    if (!acc[date]) {
      acc[date] = {
        day: date,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        icon: forecast.weather[0].icon,
        condition: forecast.weather[0].description,
        humidity: forecast.main.humidity,
        wind_speed: forecast.wind.speed,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {});

  const forecastData = Object.values(dailyForecasts);
  console.log("dailyForecasts", dailyForecasts);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-sky-500 to-pink-500 
      relative overflow-hidden w-full lg:max-h-[450px] rounded-md"
    >
      {/* Dynamic Gradient Circles */}
      <div className="absolute -top-16 -left-32 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-purple-700 to-transparent rounded-full filter blur-2xl opacity-30"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg w-full z-10 px-2 py-4 "
      >
        <h1 className="text-2xl lg:text-4xl font-bold text-center mb-8">
          🌤️ Stunning Weather Forecast
        </h1>

        {/* Weather Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
          {forecastData.map((weather, index) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`p-6 rounded-xl backdrop-blur-md bg-white/20 shadow-xl flex flex-col items-center space-y-4
                  hover:scale-110 transition-transform duration-300 hover:shadow-2xl m-2`}
              >
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.condition}
                  className="w-12 h-12"
                />
                <h2 className="text-md font-bold">{weather.day}</h2>
                <p className="text-sm">
                  {Math.round(weather.temp_min)}°C -
                  {Math.round(weather.temp_max)}°C
                </p>
                <p className="text-sm uppercase tracking-wide text-gray-200">
                  {weather.condition}
                </p>

                {/* Wind Speed */}
                <div className="flex items-center space-x-2 ">
                  <FaWind className="text-xl" />
                  <span>{Math.round(weather.wind_speed)} km/h</span>
                </div>

                {/* Humidity */}
                <div className="flex items-center space-x-2 ">
                  <FaTint className="text-xl" />
                  <span>{weather.humidity}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherForecast;
