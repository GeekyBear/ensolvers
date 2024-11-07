import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Link, Grid, Box } from "@mui/material";
import {
  fetchArchivedNotes,
  deleteNote,
  unarchiveNote,
  updateNote,
} from "../utils/noteService";
import Note from "../components/Note";

const ArchivedNotesScreen = ({ handleLogout }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchArchivedNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId).then(() => {
      setNotes(notes.filter((note) => note.id !== noteId));
    });
  };

  const handleUnarchiveNote = (noteId) => {
    unarchiveNote(noteId).then(() => {
      setNotes(notes.filter((note) => note.id !== noteId));
    });
  };

  const handleUpdateNote = (note) => {
    updateNote(note).then((updatedNote) => {
      setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    });
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Archived Notes
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Link href="/" variant="body2" sx={{ mb: 2, display: "block" }}>
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
