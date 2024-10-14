import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  Grid2 as Grid,
} from "@mui/material";
import {
  fetchNotes,
  createNote,
  deleteNote,
  archiveNote,
} from "../utils/noteService";
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";

const MainScreen = () => {
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const handleCreateNote = (note) => {
    createNote(note).then((newNote) => {
      setNotes([...notes, newNote]);
    });
  };

  const handleArchiveNote = (noteId) => {
    archiveNote(noteId).then(() => {
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
        My Notes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsNoteFormOpen(true)}
      >
        Create New Note
      </Button>
      <Link href="/archived" variant="body2">
        View Archived Notes
      </Link>
      <Grid container spacing={3}>
        {notes.length > 0 &&
          notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Note
                note={note}
                onDelete={handleDeleteNote}
                onArchive={handleArchiveNote}
              />
            </Grid>
          ))}
      </Grid>
      <NoteForm
        open={isNoteFormOpen}
        onClose={() => setIsNoteFormOpen(false)}
        onSave={handleCreateNote}
      />
    </Container>
  );
};

export default MainScreen;
