import React from "react";
import styles from "./Note.module.css";
import {
  ArchiveBoxArrowDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function Note({ note }) {
  const { id, title, content, archived } = note;

  return (
    <div key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{content}</p>
      {archived ? <p>archivada</p> : <p>no archivada</p>}
      <div className={styles.buttons}>
        <button>
          <ArchiveBoxArrowDownIcon width={20} height={20} />
        </button>

        <button>
          <PencilIcon width={20} height={20} />
        </button>
        <button>
          <TrashIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
