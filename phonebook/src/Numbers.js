import React from "react";

const Numbers = ({ data, nameFilter }) => {
  return (
    <div>
      {data.map((x) => {
        if (x.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1) {
          return (
            <p key={x.name}>
              {x.name} {x.number}
            </p>
          );
        }
      })}
    </div>
  );
};

export default Numbers;
