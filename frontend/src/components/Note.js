import React, { useState } from "react";
import styles from "./Note.module.css";
import {
  ArchiveBoxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import DeleteNote from "./DeleteNote/DeleteNote";
import authHeader from "../services/authHeader";

export default function Note({
  note,
  setEditingNote,
  setEditingId,
  reflectChanges,
  setReflectChanges,
}) {
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
    setReflectChanges(!reflectChanges);
  };

  const handleArchive = () => {
    axios
      .patch(
        `http://localhost:3000/notes/${id}`,
        { archived: !archived },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log(`Updated post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleUpdate = () => {
    setEditingId(id);
    setEditingNote(true);
    setReflectChanges(!reflectChanges);
  };

  return (
    <div key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{content}</p>
      <div className={styles.buttons}>
        <button onClick={() => handleArchive()}>
          {archived ? (
            <ArchiveBoxArrowDownIcon width={20} height={20} />
          ) : (
            <ArrowUpOnSquareStackIcon width={20} height={20} />
          )}
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
