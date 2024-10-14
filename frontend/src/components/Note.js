import React from "react";
import { Card, CardContent, Typography, IconButton, CardActions, } from "@mui/material";
import { Delete, Archive, Unarchive } from "@mui/icons-material";

const Note = ({ note, onDelete, onArchive, onUnarchive }) => (
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
      <IconButton onClick={() => onDelete(note.id)}><Delete /></IconButton>
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
  </Card>
);

export default Note;