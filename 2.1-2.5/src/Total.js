import React from "react";

const Total = ({ parts }) => {
  const exerciseValues = parts.map((exercises) => {
    return exercises.exercises;
  });

  const total = exerciseValues.reduce((s, p) => {
    return s + p;
  }, 0);

  return (
    <div>
      <h3>total of {total} exercises</h3>
    </div>
  );
};

export default Total;
