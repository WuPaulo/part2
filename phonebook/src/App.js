import React, { useState, useEffect } from "react";
import noteService from "./services/notes";
import Form from "./Form";
import Filter from "./Filter";
import Numbers from "./Numbers";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);

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
        setNewName("");
        setNewNumber("");
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const index = notes.findIndex((x) => x.name === newName);
        noteService.update(notes[index].id, noteObject).then((response) => {
          noteService
            .getAll()
            .then((response) => {
              setNotes(response.data);
            })
            .catch((error) => {
              console.log(error);
              setErrorMessages(
                `Note '${notes.content}' was already removed from server`
              );
              setTimeout(() => {
                setErrorMessages(null);
              }, 5000);
            });
        });
      }
      setNewName("");
      setNewNumber("");
    }
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
      <Notification message={errorMessage} errorMessage={errorMessages} />
      <Filter value={nameFilter} onChange={filterChange} />
      <h2>Add a new</h2>
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
