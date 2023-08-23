import axios from "axios";
import React, { useState } from "react";

const initialNote = {
  title: "",
  content: "",
  archived: false,
};

export default function CreateNote({ setCreatingNote }) {
  const [note, setNote] = useState(initialNote);

  function handleChange(e) {
    setNote({
      ...note,
      [e.target.name]:
        e.target.value !== "on" ? e.target.value : e.target.checked,
    });
  }

  function handleSubmit() {
    axios
      .post("http://localhost:3000/notes/", note)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCreatingNote(false);
  }
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        gap: 12,
        top: "30%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        boxShadow: "5px 6px 34px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h3>Create Note</h3>

      <label>
        Titulo: <input name="title" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Contenido: <input name="content" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Archivada:
        <input
          type="checkbox"
          name="archived"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <div>
        <button onClick={() => setCreatingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save note</button>
      </div>
    </div>
  );
}
