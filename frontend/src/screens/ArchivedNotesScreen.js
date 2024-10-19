import React, { useState, useEffect } from "react";
import { Container, Typography, Grid2 as Grid, Link } from "@mui/material";
import {
  fetchArchivedNotes,
  unarchiveNote,
  deleteNote,
  updateNote,
} from "../utils/noteService";
import Note from "../components/Note";

const ArchivedNotesScreen = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchArchivedNotes().then(setNotes);
  }, []);

  const handleUpdateNote = (note) => {
    updateNote(note).then((newNote) => {
      setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
    });
  };

  const handleUnarchiveNote = (noteId) => {
    unarchiveNote(noteId).then(() => {
      setNotes(notes.filter((note) => note.id !== noteId));
    });
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId).then(() => {
      setNotes(notes.filter((note) => note.id !== noteId));
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Archived Notes
      </Typography>
      <Link href="/" variant="body2">
        Go back to My Notes
      </Link>
      <Grid container spacing={3}>
        {notes.length > 0 &&
          notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Note
                note={note}
                onDelete={handleDeleteNote}
                onUnarchive={handleUnarchiveNote}
                onUpdate={handleUpdateNote}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ArchivedNotesScreen;
