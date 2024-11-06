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
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchCategories, createCategory } from "../utils/noteService";

const NoteForm = ({ open, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    note ? note.categories.map((category) => category.name) : []
  );
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories);

    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategories(
        note.categories.map((category) => category.name) || []
      );
    } else {
      setTitle("");
      setContent("");
      setSelectedCategories([]);
    }
  }, [note]);

  const handleSave = () => {
    onSave({ title, content, categories: selectedCategories || [] });
    setTitle("");
    setContent("");
    setSelectedCategories([]);
    onClose();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const newCategoryObject = await createCategory(newCategory.trim());
        setCategories([...categories, newCategoryObject]);
        setSelectedCategories([...selectedCategories, newCategoryObject.name]);
        setNewCategory("");
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Categories</InputLabel>
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
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleAddCategory}
            variant="contained"
            color="primary"
            style={{ marginLeft: "8px" }}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>
          {note ? "Save Changes" : "Create Note"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;
