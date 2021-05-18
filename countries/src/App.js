import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countriesArray, setCountriesArray] = useState([]);
  const [countries, setCountries] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountriesArray(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setCountries(e.target.value);
  };

  return (
    <div>
      find countries <input value={countries} onChange={handleChange} />
    </div>
  );
}

export default App;
