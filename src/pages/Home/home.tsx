import React, {useState} from 'react';
import {useFetch} from "../../hooks/useFetch";
import snow from '../../assets/home/weather_images/both/snow.png';
import storm from '../../assets/home/weather_images/both/storm.png';
import cloudy_day from '../../assets/home/weather_images/day/cloudy_day.png';
import rainy_day from '../../assets/home/weather_images/day/rainy_day.png';
import sun_with_clouds from '../../assets/home/weather_images/day/sun_with_clouds.png';
import sunny from '../../assets/home/weather_images/day/sunny.png';
import clear_night from '../../assets/home/weather_images/night/clear_night.png';
import cloudy_night from '../../assets/home/weather_images/night/cloudy_night.png';
import rainy_night from '../../assets/home/weather_images/night/rainy_night.png';
import styles from './home.module.css';
import {WeatherData} from "../../@types/WeatherData";

type ImageData = {
  [key: string]: string;
}

function Home() {
  const [cityName, setCityName] = useState("Santos");
  const {data: weatherList, isFetching} = useFetch<WeatherData[]>(`${cityName}/list-all-week`);

  const currentHour = new Date().getHours();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + ' GMT-0300');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const dayImages: ImageData = {
    'CHUVA': rainy_day,
    'NEVE': snow,
    'NUBLADO': cloudy_day,
    'SOL': sunny,
    'SOL_COM_NUVENS': sun_with_clouds,
    'TEMPESTADE': storm,
  };
  const nightImages: ImageData = {
    'CHUVA': rainy_night,
    'LIMPA': clear_night,
    'NEVE': snow,
    'NUBLADA': cloudy_night,
    'TEMPESTADE': storm,
  };


  return (
    <div className={'flex gap-4 items-center text-center'}>
      <ul className={'flex-col gap-2 items-center text-center'}>
        {isFetching && (
          <div className={styles.loading}>
            //TODO Adicionar nova barra de progresso/loading
          </div>
        )}
        {weatherList?.map(weather => {
          // Conditionally render the dayTimeEnum and nightTimeEnum
          const formattedDate = formatDate(weather.date);

          const showDayTimeEnum = currentHour >= 0 && currentHour < 18;
          const showNightTimeEnum = currentHour >= 18 && currentHour < 23;

          const dayTimeEnumImage = dayImages[weather.dayTimeEnum];
          const nightTimeEnumImage = nightImages[weather.nightTimeEnum];

          const formatEnum = (str: string) => {
            return str
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
          };

          return (
            <div className={styles.daysWeather}>
              <li key={weather.idWeatherData} className={'flex-col gap-10 items-center text-center'}>

                <p className={styles.weatherInfo}>{formattedDate}</p>{showDayTimeEnum && (
                <>
                  <img className={styles.imageIcon} src={dayTimeEnumImage} alt={weather.dayTimeEnum}/>
                  <p className={styles.weatherInfo}>{formatEnum(weather.dayTimeEnum)}</p>
                </>
              )}
                {showNightTimeEnum && (
                  <>
                    <img className={styles.imageIcon} src={nightTimeEnumImage} alt={weather.nightTimeEnum}/>
                    <p className={styles.weatherInfo}>{formatEnum(weather.nightTimeEnum)}</p>
                  </>
                )}
                <p className={styles.weatherInfo}>{weather.maxTemperature}ºC</p>
                <p className={styles.weatherInfo}>{weather.minTemperature}ºC</p>
                <p className={styles.weatherInfo}>{weather.precipitation}%</p>
                <p className={styles.weatherInfo}>{weather.humidity}%</p>
                <p className={styles.weatherInfo}>{weather.windSpeed}km/h</p>

              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default Home;
