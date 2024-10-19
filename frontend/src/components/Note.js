import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete, Archive, Unarchive } from "@mui/icons-material";

const Note = ({ note, onDelete, onArchive, onUnarchive, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const updatedNote = { ...note, content: noteContent, title: noteTitle };
      onUpdate(updatedNote);
      setEditOpen(false);
      // Refresh the note content in the UI
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
    handleClose();
  };

  return (
    <Card
      sx={{
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5">{note.title}</Typography>
        <Typography variant="body2">{note.content}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleEditOpen}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleClickOpen}>
          <Delete />
        </IconButton>
        {onArchive && (
          <IconButton onClick={() => onArchive(note.id)}>
            <Archive />
          </IconButton>
        )}
        {onUnarchive && (
          <IconButton onClick={() => onUnarchive(note.id)}>
            <Unarchive />
          </IconButton>
        )}
      </CardActions>
      <Dialog open={editOpen} onClose={handleEditClose}>
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
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Content"
            type="text"
            fullWidth
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Note;
