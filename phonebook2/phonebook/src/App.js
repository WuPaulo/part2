import getPersons from "./services/getPersons";
import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [filteredName, setFilteredName] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  // const [errorType, setErrorType] = useState(null);

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

      if (newName.length <= 3) {
        setNotificationType("error");
        setErrorMessage(`Name must be at least three characters long`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else if (newNumber.length <= 8) {
        setNotificationType("error");
        setErrorMessage(`Number must be at least 8 digits long `);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        getPersons
          .create(personObj)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNotificationType("Success");
            setErrorMessage(`Added ${newName}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);

            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationType("error");
            setErrorMessage(`${error.response.data.error}`);
          });
      }
    } else if (duplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const indexPerson = { ...index, number: newNumber };
        getPersons
          .update(index._id, indexPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== index._id ? person : returnedPerson
              )
            );
            setNotificationType("success");
            setErrorMessage(`Changed ${newName}'s number`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setNotificationType("error");
            setErrorMessage(
              `person '${persons.name}' was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
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
        .deleteObjectById(personTobeDeleted._id)
        .then(
          setPersons(
            persons.filter(
              (person) => person["_id"] !== personTobeDeleted["_id"]
            )
          )
        );
      setNotificationType("success");
      setErrorMessage(`Deleted ${newName} from phonebook`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notificationType={notificationType}
        message={errorMessage}
      />
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
