"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch"; // Import the Switch component

export function HourlyTemperature({ data }) {
  const [isCelsius, setIsCelsius] = useState(true); // State for toggling Celsius/Fahrenheit

  
  const chartData = data.list
    .slice(0, 8) // Get next 8 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: isCelsius ? Math.round(item.main.temp) : Math.round(item.main.temp * 9 / 5 + 32), // Convert to Fahrenheit if needed
      feels_like: isCelsius ? Math.round(item.main.feels_like) : Math.round(item.main.feels_like * 9 / 5 + 32), // Convert to Fahrenheit if needed
    }));

  // Function to format temperature based on the unit
  const formatTemp = (temp) => (isCelsius ? `${temp}°C` : `${temp}°F`);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Switch to {isCelsius ? "°F" : "°C"}</span>
          <Switch
            checked={!isCelsius}
            onCheckedChange={(checked) => setIsCelsius(!checked)}
          />
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
                tickFormatter={(value) => formatTemp(value)} 
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 border rounded-lg shadow-sm bg-background">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {formatTemp(payload[0].value)} 
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {formatTemp(payload[1].value)} 
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
