import React from "react";
import { useState, useEffect } from "react";
import Weather from "./Weather";
import axios from "axios";
import Content from "./Content";

const Countries = ({ countries }) => {
  //   const api_key = process.env.REACT_APP_API_KEY;
  //   const api_key = "055e9ab0edb93ed11709fb945b8eebfd";

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `http://api.weatherstack.com/current?access_key=${api_key}&query=${cityName}`
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //       });
  //   }, [weather]);

  const handleClick = () => {
    console.log("hello");
  };

  if (countries.length > 10) {
    return <p>Too many matches , specify another</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <p>capital:{countries[0].capital}</p>
        <p>population:{countries[0].population}</p>
        <h2>languages</h2>
        <ul>
          {countries[0].languages.map((country) => {
            return <li key={country.name}>{country.name}</li>;
          })}
        </ul>
        <p>{countries[0].name}</p>
        <img src={countries[0].flag} alt="flag of {countries[0].name}" />
        <Weather city={countries[0].capital} />
      </div>
    );
  }
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.name}>
            <p>
              {country.name} <button onClick={handleClick}>Show</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
