import React from 'react';
import axios from 'axios';
import './NoteCard.css';
import { useToken } from '../../context/token-context';
import { useNotesList } from '../../context/notes-list-context';

export const NoteCard = ({ item }) => {
  const { _id: id, title, description, color } = item;
  const { token } = useToken();
  const { setNotesList } = useNotesList();

  //delete
  const handleDelete = async () => {
    const deletResponse = await axios.delete(`/api/notes/${id}`, {
      headers: { authorization: token },
    });
    if (deletResponse.status === 200 || deletResponse === 201) {
      setNotesList([...deletResponse.data.notes]);
    }
  };

  //archive
  const handleArchive = async () => {
    const archiveResponse = await axios.post(
      `/api/notes/archives/${id}`,
      { note: { item } },
      {
        headers: { authorization: token },
      }
    );
    console.log(archiveResponse);
    // if (archiveResponse.status === 200 || deletResponse === 201) {
    //   setNotesList([...deletResponse.data.notes]);
    // }
  };
  const handleEdit = () => {};

  return (
    <div
      style={{ backgroundColor: color }}
      class="card card-only-text note-card"
    >
      <div class="card-head">
        <h3 class="card-heading d-flex">
          {title}
          <span class="badge-text badge-sm badge-accent">Work</span>
        </h3>
        <div class="card-content card-description-section">
          <p>{description}</p>
        </div>
      </div>

      <div className="card-foot note-editing-option">
        <button
          className="btn btn-only-icon note-delete"
          onClick={handleDelete}
        >
          <span className="fa-solid fa-trash"></span>
        </button>
        <button
          className="btn btn-only-icon note-archive"
          onClick={handleArchive}
        >
          <span className="fa-solid fa-archive"></span>
        </button>
        <button className="btn btn-only-icon note-edit" onClick={handleEdit}>
          <span className="fa-solid fa-pencil"></span>
        </button>
      </div>
    </div>
  );
};
