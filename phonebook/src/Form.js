import React from "react";

const Form = ({ onSubmit, onChange, numberChange, newName, newNumber }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={newName} onChange={onChange} required />
        </div>
        <div>
          Number:{" "}
          <input
            type="number"
            value={newNumber}
            onChange={numberChange}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
