import React from "react";

const Persons = ({ persons, deleteClick }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          <p>
            {person.name} {person.number}{" "}
            <button onClick={() => deleteClick(person)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
