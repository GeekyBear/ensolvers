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
} from "@mui/material";
import { Edit, Delete, Archive, Unarchive } from "@mui/icons-material";
import NoteEditDialog from "./NoteEditDialog";

const Note = ({ note, onDelete, onArchive, onUnarchive, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
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
      <NoteEditDialog
        open={editOpen}
        onClose={handleEditClose}
        note={note}
        onSave={onUpdate}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Note;
