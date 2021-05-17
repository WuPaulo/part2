import React, { useState } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const duplicate = persons.some((i) => i.name.includes(newName));
    if (!duplicate) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      window.alert(`${newName} is already added to the phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const onChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterChange = (e) => {
    setNameFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={filterChange} />
      <h2>add a new</h2>
      <Form
        onSubmit={handleClick}
        onChange={onChange}
        numberChange={numberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers data={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
