import React, { useEffect } from 'react';
import axios from 'axios';
import './NoteCard.css';
import { useToken } from '../../context/token-context';
import { useNotesList } from '../../context/notes-list-context';
import { useArchivesList } from '../../context/archive-list-context';
import { useNoteInputContext } from '../../context/note-input-context';

export const NoteCard = ({ item, archive }) => {
  const { _id: id, title, description, color } = item;
  const { token } = useToken();
  const { setNotesList } = useNotesList();
  const { archivesList, setArchivesList } = useArchivesList();
  const { note, display, noteDispatch } = useNoteInputContext();

  useEffect(() => {}, [display]);

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
      { note: item },
      {
        headers: { authorization: token },
      }
    );
    console.log(archiveResponse);
    if (archiveResponse.status === 200 || archiveResponse.status === 201) {
      setArchivesList([...archiveResponse.data.archives]);
      setNotesList([...archiveResponse.data.notes]);
    }
  };

  //archive delete
  const handleDeleteArchive = async () => {
    try {
      const delArchResponse = await axios.delete(`/api/archives/delete/${id}`, {
        headers: {
          authorization: token,
        },
      });
      if (delArchResponse.status === 200 || delArchResponse.status === 201) {
        setArchivesList([...delArchResponse.data.archives]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //restore archive
  const handleArchiveRestore = async () => {
    try {
      const restoreArchRes = await axios.post(
        `/api/archives/restore/${id}`,
        { archives: item },
        {
          headers: { authorization: token },
        }
      );
      if (restoreArchRes.status === 200 || restoreArchRes.status === 201) {
        setArchivesList([...restoreArchRes.data.archives]);
        setNotesList([...restoreArchRes.data.notes]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async () => {
    noteDispatch({
      type: 'CLEAR_AFTER_ADD',
      payload: {
        note: {
          title: title,
          description: description,
          color: color,
          tags: item.tags,
        },
        display: true,
        editId: id,
      },
    });
    // if (display) {
    //   try {
    //     const editResponse = await axios.post(
    //       `/api/notes/${id}`,
    //       { note },
    //       {
    //         headers: { authorization: token },
    //       }
    //     );
    //     if (editResponse.status === 200 || editResponse.status === 201) {
    //       setNotesList([...editResponse.data.notes]);
    //       noteDispatch({
    //         type: 'CLEAR_AFTER_ADD',
    //         payload: {
    //           note: { title: '', description: '', color: 'white', tags: [] },
    //           display: false,
    //           edit: false,
    //         },
    //       });
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
  };
  console.log(archive);

  return (
    <div
      style={{ backgroundColor: color }}
      class="card card-only-text note-card"
    >
      <div class="card-head">
        <h3 class="card-heading d-flex">
          {title}
          {Object.keys(item.tags)
            .filter((catKey) => item.tags[catKey])
            .map((badge) => (
              <span class="badge-text badge-sm badge-accent">{badge}</span>
            ))}
        </h3>
        <div class="card-content card-description-section">
          <p>{description}</p>
        </div>
      </div>

      <div className="card-foot note-editing-option">
        {archive ? (
          <>
            <button
              className="btn btn-only-icon note-delete"
              onClick={handleDeleteArchive}
            >
              <span className="fa-solid fa-trash"></span>
            </button>
            <button
              className="btn btn-only-icon note-archive"
              onClick={handleArchiveRestore}
            >
              <span className="fa-solid fa-box-open"></span>
            </button>
          </>
        ) : (
          <>
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
              <span className="fa-solid fa-box"></span>
            </button>
            <button
              className="btn btn-only-icon note-edit"
              onClick={handleEdit}
            >
              <span className="fa-solid fa-pencil"></span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
