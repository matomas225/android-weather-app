import React from "react"
import "../styles/weatherStyles.css"
import {
  useEffect,
  useState,
  useMemo,
} from "react"
import axios from "axios";
import moment from "moment";
import visitorApi from "visitorapi";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";

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

  const [location,
    setLocation] = useState();

  const [error,
    setError] = useState();

  const [hasChanged,
    setHasChanged] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const key = import.meta.env.VITE_WEATHER_API_KEY

  const fetchWeather = () => axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${location?.locationName}&units=metric&apikey=${key}`).then(response => setWeather(response.data)
  ).catch(error => setError(error));

  const fetchLocation = () => visitorApi("QYfSECB0vp4hXVV3fo61").then(data => setLocation({
    locationName: data.countryName,
    locationCode: data.countryCode,
  })).then(() => fetchWeather()).catch(error => setError(error));

  useEffect(() => {
    fetchLocation();
  }, []);
  
  useEffect(() => {
    fetchWeather();
    setHasChanged(false);
  }, [hasChanged === true])




  return (
    <section className="weather-wrap">
      {location && weather ? <div>
        <p>
          {moment(weather.data.time).format('MMMM Do YYYY, h:mm a')}
        </p>
        <div className="text-flag">
          <p>
            {location.locationName}
          </p>
          <ReactCountryFlag
            countryCode={location.locationCode}
            svg
            style={ {
              background: "none",
            }} />
        </div>

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
<div className="select-country">
<p>
Select Country
</p>
<Select
options={options}
value={location.locationName}
onChange={val => {
setLocation({
locationName: val.label,
locationCode: val.value
});
setHasChanged(true);
}} />
</div>
</div>: <div>
<p>
Can't show weather at the moment.
{JSON.stringify(error)}
</p>
</div>
}
</section>
)
};
export default Weather