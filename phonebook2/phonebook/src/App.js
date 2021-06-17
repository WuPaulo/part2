import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [filteredName, setFilteredName] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (e) => {
    e.preventDefault();

    const duplicate = persons.some((i) => i.name.includes(newName));

    if (!duplicate) {
      const personObj = { name: newName, number: newNumber };
      axios
        .post("http://localhost:3001/persons", personObj)
        .then((response) => {
          setPersons(persons.concat(response.data));
        });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const nameChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterChange = (e) => {
    setNameFilter(e.target.value);
    setFilteredName(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={filterChange} />
      <h2>Add a New Person</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameChange={nameChange}
        numberChange={numberChange}
      />
      <h2>Numbers</h2>
      {nameFilter.length > 0 ? (
        <Persons persons={filteredName}></Persons>
      ) : (
        <Persons persons={persons}></Persons>
      )}
    </div>
  );
};

export default App;
