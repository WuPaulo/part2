import React from "react";
import Delete from "./Delete";

const Numbers = ({ data, nameFilter, noteObject }) => {
  return (
    <div>
      {data.map((x) => {
        if (x.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1) {
          return (
            <p key={x.id}>
              {x.name} {x.number} <Delete id={x.id} noteObject={noteObject} />
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Numbers;
