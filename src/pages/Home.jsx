import React from "react";

const Home = ({ data }) => {
  const {
    weather: [currentWeather],
    sys: { sunrise, sunset },
  } = data;

  return (
    <div className=" min-h-[420px]  flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-500 w-full">
      <header className="relative backdrop-blur-md bg-white/30 backdrop-saturate-200 border border-white/20 shadow-lg rounded-2xl py-6 px-8 w-[90%] max-w-lg">
        <div className="container mx-auto flex flex-col items-center text-center">
          {/* Weather Icon */}
          <div className="relative flex aspect-square w-full max-w-[150px] items-center justify-center mb-4">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Weather Description */}
          <div className="absolute top-4 left-4 text-xs bg-white/40 px-2 py-1 rounded-full shadow-sm backdrop-blur-md text-gray-700">
            <p className="font-semibold">Weather Today</p>
          </div>
          <div className="absolute bottom-4 text-center">
            <p className="text-2xl font-bold capitalize   drop-shadow-md mt-4 pb-36 lg:pb-24">
              {currentWeather.description}
            </p>
          </div>

          {/* Sunrise and Sunset */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4 md:px-8">
            {/* Sunrise Section */}
            <div className="text-center">
              <p className="text-md font-medium text-gray-800">Sunrise</p>
              <p className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-lg">
                {new Date(sunrise * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Sunset Section */}
            <div className="text-center">
              <p className="text-md font-medium text-gray-800">Sunset</p>
              <p className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 drop-shadow-lg">
                {new Date(sunset * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
