import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

function App() {
  const [countriesArray, setCountriesArray] = useState([]);
  const [countries, setCountries] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);


  const handleChange = (e) => {
    setCountries(e.target.value);
    if (countries) {
      const regex = new RegExp(countries, "i");
      const filterData = () =>
        countriesArray.filter((country) => country.name.match(regex));
      setFilteredCountries(filterData);
    }
  };

  return (
    <div>
      find countries <input value={countries} onChange={handleChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
