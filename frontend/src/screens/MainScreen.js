import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  Grid2 as Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  fetchNotes,
  createNote,
  deleteNote,
  archiveNote,
  updateNote,
  fetchCategories,
} from "../utils/noteService";
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";

const MainScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchNotes().then((fetchedNotes) => {
      console.log("Fetched Notes:", fetchedNotes);
      setNotes(fetchedNotes);
    });
    fetchCategories().then(setCategories);
  }, []);

  const handleCreateNote = (note) => {
    createNote(note).then((newNote) => {
      setNotes([...notes, newNote]);
      const newCategories = newNote.categories.map((category) => category.name);
      setCategories((prevCategories) => {
        const existingCategoryNames = prevCategories.map(
          (category) => category.name
        );
        const updatedCategories = [...prevCategories];
        newCategories.forEach((categoryName) => {
          if (!existingCategoryNames.includes(categoryName)) {
            updatedCategories.push({ id: newNote.id, name: categoryName });
          }
        });
        return updatedCategories;
      });
    });
  };

  const handleUpdateNote = (note) => {
    updateNote(note).then((newNote) => {
      setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const filteredNotes = selectedCategory
    ? notes.filter((note) => {
        console.log("Note Categories:", note.categories);
        return note.categories.some(
          (category) => category.name === selectedCategory
        );
      })
    : notes;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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
      </Box>
      <FormControl
        variant="outlined"
        style={{ minWidth: 200, marginBottom: 16 }}
      >
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Filter by Category"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {filteredNotes.length > 0 &&
          filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Note
                note={note}
                onDelete={handleDeleteNote}
                onArchive={handleArchiveNote}
                onUpdate={handleUpdateNote}
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
