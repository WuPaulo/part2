import getPersons from "./services/getPersons";
import React, { useState, useEffect } from "react";
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
    getPersons.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const duplicate = persons.some((i) =>
      i.name.toLowerCase().includes(newName.toLowerCase())
    );

    if (!duplicate) {
      const personObj = { name: newName, number: newNumber };
      getPersons.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    } else if (duplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.find((person) => person.name === newName);
        const indexPerson = { ...index, number: newNumber };
        console.log(index.id);
        getPersons.update(index.id, indexPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== index.id ? person : returnedPerson
            )
          );
        });
      }
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

  const deleteClick = (personTobeDeleted) => {
    if (window.confirm(`Delete ${personTobeDeleted.name} ?`)) {
      getPersons
        .deleteObjectById(personTobeDeleted.id)
        .then(
          setPersons(
            persons.filter((person) => person.id !== personTobeDeleted.id)
          )
        );
    }
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
        <Persons persons={filteredName} deleteClick={deleteClick}></Persons>
      ) : (
        <Persons persons={persons} deleteClick={deleteClick}></Persons>
      )}
    </div>
  );
};

export default App;
