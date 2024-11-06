import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  Box,
  Chip,
  MenuItem,
} from "@mui/material";
import { fetchCategories } from "../utils/noteService";

const NoteEditDialog = ({ open, onClose, note, onSave }) => {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    note ? note.categories?.map((category) => category.name) : []
  );

  useEffect(() => {
    try {
      fetchCategories().then(setCategories);
    } catch (error) {
      console.log(error);
    }

    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setSelectedCategories(
        note.categories?.map((category) => category.name) || []
      );
    }
  }, [note]);

  const handleSave = async () => {
    console.log("note", note);
    console.log("noteTitle", noteTitle);
    console.log("noteContent", noteContent);
    console.log("selectedCategories", selectedCategories);

    const updatedNote = {
      ...note,
      content: noteContent,
      title: noteTitle,
      categories: selectedCategories || [],
    };
    try {
      await onSave(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
    }
    onClose();
  };

  const handleCategoryChange = (event) => {
    console.log("event.target.value", event.target.value);
    setSelectedCategories(event.target.value || []);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Note Title"
          type="text"
          fullWidth
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Note Content"
          type="text"
          fullWidth
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => (
            <Box display="flex" flexWrap="wrap">
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          fullWidth
        >
          {(categories || []).map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Box mt={2}>
          {(selectedCategories || []).map((category, index) => (
            <Chip key={index} label={category} style={{ margin: "2px" }} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteEditDialog;
