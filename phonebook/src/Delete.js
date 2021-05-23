import React from "react";
import noteService from "./services/notes";

const Delete = ({ name, id, noteObject, setNotes }) => {
  const deleteNote = () => {
    if (window.confirm(`Delete ${name}`)) {
      noteService.deleteNote(id, noteObject).then((response) => {
        noteService.getAll().then((response) => {
          setNotes(response.data);
        });
      });
    }
  };
  return <button onClick={deleteNote}>delete</button>;
};

export default Delete;
