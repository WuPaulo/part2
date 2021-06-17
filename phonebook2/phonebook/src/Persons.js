import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
