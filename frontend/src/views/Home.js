import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import CreateNote from "../components/CreateNote/CreateNote";
import EditNote from "../components/EditNote/EditNote";

export default function Home({ isArchived }) {
  const [notes, setNotes] = useState([]);
  const [creatingNote, setCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          isArchived: false,
        },
      })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [notes, isArchived]);

  return (
    <>
      <div style={{ display: "flex", gap: 12, position: "relative" }}>
        <h1>My notes</h1>
        <button
          style={{
            margin: 20,
            marginBottom: 40,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 20,
          }}
          onClick={() => setCreatingNote(true)}
        >
          Create note
        </button>
        <Link
          style={{
            margin: 20,
            marginBottom: 40,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 20,
          }}
          to="/archived"
        >
          Archived
        </Link>
      </div>
      {creatingNote && <CreateNote setCreatingNote={setCreatingNote} />}
      {editingNote && (
        <EditNote setEditingNote={setEditingNote} editingId={editingId} />
      )}
      <section className="grid-1">
        {notes ? (
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
            />
          ))
        ) : (
          <p>Cargando</p>
        )}
      </section>
    </>
  );
}
