import React from "react";

const Countries = ({ countries }) => {
  console.log(countries);
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
            return <li>{country.name}</li>;
          })}
        </ul>
        <p>{countries[0].name}</p>
        <img src={countries[0].flag} />
      </div>
    );
  }
  return (
    <div>
      {countries.map((country) => {
        return <p>{country.name}</p>;
      })}
    </div>
  );
};

export default Countries;
