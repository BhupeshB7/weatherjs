import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { WiCloudyGusts, WiBarometer } from "react-icons/wi";

const CurrentAirPollution = ({ data, locationName }) => {
  console.log("Air pollution data", data);

  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Safely extract AQI and components from the data
  const { aqi, components } = data?.list?.[0] || {};
  
  const aqiDescriptions = [
    "Good", "Fair", "Moderate", "Poor", "Very Poor",
  ];
  const aqiColors = ["green", "yellow", "orange", "red", "purple"];
  
  // Ensure that aqi is within a valid range (1-5)
  const aqiIndex = aqi ? aqi - 1 : 0;

  const themeStyles = `w-full max-w-md mx-auto mt-6 bg-gradient-to-br from-blue-100 to-blue-300 p-6 rounded-lg shadow-xl`;

  return (
    <motion.div
      className={themeStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden relative">
        <CardHeader className="text-center">
          {isLoading ? (
            <div className="animate-pulse h-6 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
          ) : (
            <>
              <CardTitle className="text-3xl font-bold tracking-wider">
                Air Quality in {locationName}
              </CardTitle>
              {aqi ? (
                <p className={`text-lg font-semibold text-${aqiColors[aqiIndex]}-500`}>
                  {aqiDescriptions[aqiIndex]} (AQI: {aqi})
                </p>
              ) : null}
            </>
          )}
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 pt-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse h-6 bg-gray-300 rounded-md"></div>
            ))
          ) : (
            <>
              {/* PM2.5 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <WiCloudyGusts size={32} className="text-gray-600" />
                <span>
                  <strong>PM2.5:</strong> {components?.pm2_5 || "N/A"} µg/m³
                </span>
              </motion.div>

              {/* PM10 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <WiCloudyGusts size={32} className="text-gray-600" />
                <span>
                  <strong>PM10:</strong> {components?.pm10 || "N/A"} µg/m³
                </span>
              </motion.div>

              {/* CO */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <WiBarometer size={32} className="text-blue-600" />
                <span>
                  <strong>CO:</strong> {components?.co || "N/A"} µg/m³
                </span>
              </motion.div>

              {/* NO2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <WiBarometer size={32} className="text-blue-600" />
                <span>
                  <strong>NO2:</strong> {components?.no2 || "N/A"} µg/m³
                </span>
              </motion.div>

              {/* O3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <WiBarometer size={32} className="text-blue-600" />
                <span>
                  <strong>O3:</strong> {components?.o3 || "N/A"} µg/m³
                </span>
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CurrentAirPollution;
