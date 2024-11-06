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

const NoteForm = ({ open, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    note ? note.categories : []
  );

  useEffect(() => {
    fetchCategories().then(setCategories);

    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSave = () => {
    onSave({ title, content, categories: selectedCategories || [] });
    onClose();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{note ? "Edit Note" : "Create Note"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          type="text"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Box mt={2}>
          {selectedCategories.map((category) => (
            <Chip key={category} label={category} />
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

export default NoteForm;
