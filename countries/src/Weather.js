import axios from "axios";
import React, { useState, useEffect } from "react";

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  //   const api_key = "055e9ab0edb93ed11709fb945b8eebfd";
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((response) => {
        setInformation(response.data.current);
      });
  }, []);

  return (
    <div>
      <h2>weather in {city}</h2>
      <p>
        <strong>temperature:{information.temperature} Celsius</strong>
      </p>
      <img
        src={information.weather_icons}
        alt={information.weather_descriptions}
      />
      <p>
        <strong>
          wind:{information.wind_speed}mph direction {information.wind_dir}
        </strong>
      </p>
    </div>
  );
};

export default Weather;
