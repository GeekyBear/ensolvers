import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          isArchived,
        },
      })
      .then(function (response) {
        // handle success
        setNotes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [isArchived]);

  const Home = ({ setIsArchived }) => {
    useEffect(() => {
      setIsArchived(false);
    }, []);

    return (
      <>
        <div style={{ display: "flex", gap: 12 }}>
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
        <section className="grid-1">
          {notes ? (
            notes.map((note) => <Note key={note.id} note={note} />)
          ) : (
            <p>Cargando</p>
          )}
        </section>
      </>
    );
  };

  const Archived = () => {
    useEffect(() => {
      setIsArchived(true);
    }, []);
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
            notes.map((note) => <Note key={note.id} note={note} />)
          ) : (
            <p>Cargando</p>
          )}
        </section>
      </>
    );
  };

  // <Routes>

  return (
    <div className="App">
      <Routes>
        <Route index element={<Home setIsArchived={setIsArchived} />} />
        <Route path="archived" element={<Archived />} />
      </Routes>
    </div>
  );
}

export default App;
