"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // Import the Switch component

export function CurrentWeather({ data, locationName }) {
  const [isCelsius, setIsCelsius] = useState(true); // State for toggling Celsius/Fahrenheit

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Convert temperature to Celsius or Fahrenheit
  const formatTemp = (temp) =>
    isCelsius
      ? `${Math.round(temp)}°C`
      : `${Math.round((temp * 9) / 5 + 32)}°F`; // Convert to Fahrenheit if needed

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
        
          <div className="space-y-4">
          
          <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Switch to {isCelsius ? "°F" : "°C"}</span>
              <Switch
                checked={!isCelsius}
                onCheckedChange={(checked) => setIsCelsius(!checked)} 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold tracking-tighter text-7xl">
                {formatTemp(temp)} 
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)} 
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="w-3 h-3" />
                    {formatTemp(temp_min)} 
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="w-3 h-3" />
                    {formatTemp(temp_max)} 
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>

            
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="object-contain w-full h-full"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
