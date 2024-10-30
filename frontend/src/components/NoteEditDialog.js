import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const NoteEditDialog = ({ open, onClose, note, onSave }) => {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    try {
      const updatedNote = { ...note, content: noteContent, title: noteTitle };
      await onSave(updatedNote);
      onClose();
    } catch (error) {
      console.error("Error updating note:", error);
    }
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
