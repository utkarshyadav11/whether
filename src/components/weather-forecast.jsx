import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch"; // Import the Switch component

export function WeatherForecast({ data }) {
  // State for the unit: 'metric' for Celsius, 'imperial' for Fahrenheit
  const [unit, setUnit] = useState("metric");

  // Group forecast by day and get daily min/max
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {});

  // Get next 5 days
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature based on unit
  const formatTemp = (temp) => {
    if (unit === "metric") {
      return `${Math.round(temp)}°C`;
    } else {
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${Math.round(fahrenheit)}°F`;
    }
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Celsius</p>
          <Switch
            checked={unit === "imperial"}
            onCheckedChange={toggleUnit} // Handle switch toggle
          />
          <p className="text-sm text-muted-foreground">Fahrenheit</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid items-center grid-cols-3 gap-4 p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm capitalize text-muted-foreground">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  {formatTemp(day.temp_min)} {/* Use formatted temp */}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  {formatTemp(day.temp_max)} {/* Use formatted temp */}
                </span>
              </div>

              <div className="flex justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
