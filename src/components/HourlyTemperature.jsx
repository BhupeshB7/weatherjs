import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Brush,
} from "recharts";
import { format } from "date-fns";

export function HourlyTemperature({ data }) {
  const [activeLine, setActiveLine] = useState(null);

  // Prepare chart data
  const chartData = data.list
    .slice(0, 24) // Get 24 hours (1-hour intervals assumed)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
    }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Interactive Temperature Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold pl-5">
                              {payload[0]?.value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold pl-5">
                              {payload[1]?.value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Humidity
                            </span>
                            <span className="font-bold pl-5">
                              {payload[2]?.value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                onMouseEnter={(e) => setActiveLine(e.dataKey)}
                onMouseLeave={() => setActiveLine(null)}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke={activeLine === "temp" ? "#2563eb" : "#8884d8"}
                strokeWidth={activeLine === "temp" ? 3 : 2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke={activeLine === "feels_like" ? "#34d399" : "#82ca9d"}
                strokeWidth={activeLine === "feels_like" ? 3 : 2}
                dot={false}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke={activeLine === "humidity" ? "#34d399" : "#ffc658"}
                strokeWidth={activeLine === "humidity" ? 3 : 2}
                dot={false}
              />
              <Brush
                dataKey="time"
                height={30}
                stroke="#888888"
                travellerWidth={10}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
