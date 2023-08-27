import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import CreateNote from "../components/CreateNote/CreateNote";
import EditNote from "../components/EditNote/EditNote";
import authHeader from "../services/authHeader";

export default function Home({ isArchived }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [creatingNote, setCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState("default");
  const [reflectChanges, setReflectChanges] = useState(false);

  function filterNotes() {
    if (filterName !== "default") {
      console.log("filterName", filterName);
      setFilteredNotes(
        notes.filter((note) =>
          note.categories.find((cat) => cat.name === filterName)
        )
      );
    } else {
      console.log("else");
      setFilteredNotes([]);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          isArchived: false,
        },
        headers: authHeader(),
      })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isArchived, reflectChanges]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories", {
        headers: authHeader(),
      })
      .then(function (response) {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  async function handleSelect(e) {
    console.log("handle Select");
    setFilterName(e.target.value);
    filterNotes();
  }

  const ConditionalRendering = () => {
    if (filterName !== "default") {
      console.log("filterName conditional rendering", filterName);
      return filteredNotes.map((note) => (
        <Note
          key={note.id}
          setEditingNote={setEditingNote}
          setEditingId={setEditingId}
          note={note}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
      ));
    } else {
      return notes.map((note) => (
        <Note
          key={note.id}
          setEditingNote={setEditingNote}
          setEditingId={setEditingId}
          note={note}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
      ));
    }
  };

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

      <div style={{ display: "flex", color: "wheat", gap: 12 }}>
        <p>Filter by category</p>
        <select
          style={{ margin: "8px 0px" }}
          name="select"
          onChange={(e) => handleSelect(e)}
        >
          <option value="default">Default</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <section className="grid-1">
        <ConditionalRendering />
      </section>
    </>
  );
}
