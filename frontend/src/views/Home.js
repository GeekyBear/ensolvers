import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import CreateNote from "../components/CreateNote/CreateNote";
import EditNote from "../components/EditNote/EditNote";
import authHeader from "../services/authHeader";
import { API_URL } from "../constants/constants";

export default function Home({ isArchived }) {
  const [notes, setNotes] = useState([]);
  const [creatingNote, setCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState("default");
  const [reflectChanges, setReflectChanges] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authHeader()) return navigate("/login");

    async function fetchData() {
      await axios
        .get(API_URL + "notes", {
          params: {
            isArchived: false,
            filterName,
          },
          headers: authHeader(),
        })
        .then(function (response) {
          setNotes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, [isArchived, reflectChanges, filterName, navigate]);

  useEffect(() => {
    axios
      .get(API_URL + "categories", {
        headers: authHeader(),
      })
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  async function handleSelect(e) {
    setFilterName(e.target.value);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 24,
          position: "relative",
          alignItems: "center",
        }}
      >
        <h1>My notes</h1>
        <button
          style={{
            marginLeft: 24,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 12,
          }}
          onClick={() => setCreatingNote(true)}
        >
          Create note
        </button>
        <Link
          style={{
            textDecoration: "none",
            color: "wheat",
          }}
          to="/archived"
        >
          Go to archived notes
        </Link>
      </div>
      {creatingNote && (
        <CreateNote
          setCreatingNote={setCreatingNote}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
      )}
      {editingNote && (
        <EditNote
          setEditingNote={setEditingNote}
          editingId={editingId}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
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
        {notes &&
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))}
      </section>
    </>
  );
}
