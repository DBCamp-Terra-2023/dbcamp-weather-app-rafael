export declare interface WeatherData {
  idWeatherData: number;
  city: {
    idCity: number;
    name: string;
  }
  date: string;
  dayTimeEnum: string;
  nightTimeEnum: string;
  maxTemperature: number;
  minTemperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}