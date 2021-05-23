import React from "react";
import noteService from "./services/notes";

const Delete = ({ id, noteObject }) => {
  const deleteNote = () => {
    console.log("worked");
    noteService.deleteNote(id, noteObject).then((response) => {});
  };
  return <button onClick={deleteNote}>delete</button>;
};

export default Delete;
