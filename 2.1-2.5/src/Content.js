import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.parts.map((x) => {
        return <Part parts={x.name} exercises={x.exercises} key={x.id} />;
      })}
    </div>
  );
};

export default Content;
