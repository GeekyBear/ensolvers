import React, { useState } from "react";
import styles from "./Note.module.css";
import {
  ArchiveBoxArrowDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import DeleteNote from "./DeleteNote/DeleteNote";

export default function Note({ note, setEditingNote, setEditingId }) {
  const { id, title, content, archived } = note;
  const [deletingNote, setDeletingNote] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/notes/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleArchive = () => {
    axios
      .patch(`http://localhost:3000/notes/${id}`, { archived: !archived })
      .then((response) => {
        console.log(`Updated post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    setEditingId(id);
    setEditingNote(true);
  };

  return (
    <div key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{content}</p>
      {archived ? <p>archivada</p> : <p>no archivada</p>}
      <div className={styles.buttons}>
        <button onClick={() => handleArchive()}>
          <ArchiveBoxArrowDownIcon width={20} height={20} />
        </button>
        <button onClick={() => handleUpdate()}>
          <PencilIcon width={20} height={20} />
        </button>
        <button onClick={() => setDeletingNote(true)}>
          <TrashIcon width={20} height={20} />
        </button>
      </div>
      {deletingNote && (
        <DeleteNote
          handleDelete={handleDelete}
          setDeletingNote={setDeletingNote}
        />
      )}
    </div>
  );
}
