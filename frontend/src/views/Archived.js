import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import EditNote from "../components/EditNote/EditNote";
import authHeader from "../services/authHeader";

export default function Archived() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reflectChanges, setReflectChanges] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          isArchived: true,
        },
        headers: authHeader(),
      })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reflectChanges]);

  return (
    <>
      <div style={{ display: "flex", gap: 12 }}>
        <h1>Archived notes</h1>
        <Link
          style={{
            margin: 20,
            marginBottom: 40,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 20,
          }}
          to="/"
        >
          Home
        </Link>
      </div>
      <section className="grid-1">
        {notes ? (
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))
        ) : (
          <p>Cargando</p>
        )}
        {editingNote && (
          <EditNote setEditingNote={setEditingNote} editingId={editingId} />
        )}
      </section>
    </>
  );
}
