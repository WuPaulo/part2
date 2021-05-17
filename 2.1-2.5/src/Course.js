import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web Developement Curriculum</h1>
      <Header course={course[0].name} />
      <Content parts={course[0]} />
      <Total parts={course[0].parts} />
      <Header course={course[1].name} />
      <Content parts={course[1]} />
      <Total parts={course[1].parts} />
    </div>
  );
};

export default Course;
