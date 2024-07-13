import React from "react"
import "../styles/weatherStyles.css"
import {
  useEffect,
  useState
} from "react"
import axios from "axios";
import moment from "moment";

const weatherss = {
  "data": {
    "time": "2024-07-13T04:38:00Z",
    "values": {
      "cloudBase": 0.38,
      "cloudCeiling": 0.38,
      "cloudCover": 100,
      "dewPoint": 17.13,
      "freezingRainIntensity": 0,
      "humidity": 83,
      "precipitationProbability": 0,
      "pressureSurfaceLevel": 1002.18,
      "rainIntensity": 0,
      "sleetIntensity": 0,
      "snowIntensity": 0,
      "temperature": 20.13,
      "temperatureApparent": 20.13,
      "uvHealthConcern": 0,
      "uvIndex": 0,
      "visibility": 15.05,
      "weatherCode": 1001,
      "windDirection": 59.63,
      "windGust": 5.13,
      "windSpeed": 2.88
    }
  },
  "location": {
    "lat": 55.349998474121094,
    "lon": 23.75,
    "name": "Lietuva",
    "type": "administrative"
  }
};



const Weather = () => {
  const [weather,
    setWeather] = useState();
  const key = import.meta.env.VITE_WEATHER_API_KEY

  const apiLink = "https://api.tomorrow.io/v4/weather/realtime?location=lithuania&units=metric&apikey="

  const fetchWeather = () => axios.get(`${apiLink}${key}`).then(response => setWeather(response.data)).catch(error => setWeather(error));

  useEffect(() => {
    fetchWeather();
  }, []);


  return (
    <section className="weather-wrap">
      {weather && <div>
        <p>
          {moment(weather.data.time).format('MMMM Do YYYY, h:mm a')}
        </p>
        <p>
          {weather.location.name} 🇱🇹
        </p>
        <div className="weather-elements">
          <p>
            <img src="./temp.png" />
          {Math.round(weather.data.values.temperature)}°C
        </p>
        <p>
          <img src="./cloudy.png" />
        {weather.data.values.cloudCover}%
      </p>
      <p>
        <img src="./humidity.png" />
      {weather.data.values.humidity}%
    </p>
    <p>
      <img src="./rainy.png" />
    {weather.data.values.rainIntensity}mm/h
  </p>
  <p>
    <img src="./wind.png" />
  {weather.data.values.windSpeed}m/s
</p>
<p>
  <img src="./sunny.png" />
{weather.data.values.uvIndex} uv
</p>
</div>
</div>
}
</section>
)
};
export default Weather