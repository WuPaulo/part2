import React from "react";

const Persons = ({ persons, deleteClick }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <li key={i}>
          <p>
            {person.name} {person.number}{" "}
            <button onClick={() => deleteClick(person)}>Delete</button>
          </p>
        </li>
      ))}
    </div>
  );
};

export default Persons;
