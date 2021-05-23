import React, { useState, useEffect } from "react";
import noteService from "./services/notes";
import Form from "./Form";
import Filter from "./Filter";
import Numbers from "./Numbers";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const noteObject = {};

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      name: newName,
      number: newNumber,
      date: new Date(),
      important: Math.random() < 0.5,
    };

    const duplicate = notes.some((i) => i.name.includes(newName));
    if (!duplicate) {
      noteService.create(noteObject).then((response) => {
        setNotes(notes.concat(response.data));
      });
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
        onSubmit={addNote}
        onChange={onChange}
        numberChange={numberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers
        data={notes}
        nameFilter={nameFilter}
        noteObject={noteObject}
        setNotes={setNotes}
      />
    </div>
  );
};

export default App;
