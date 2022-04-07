import React, { useEffect, useState } from 'react';
import { useNotesList } from '../../context/notes-list-context';
import axios from 'axios';
import { useNoteInputContext } from '../../context/note-input-context';
import './NotesInputModal.css';
import { useToken } from '../../context/token-context';

export const NotesInputModal = () => {
  const { note, display, noteDispatch } = useNoteInputContext();
  const { title, description } = note;
  const { token } = useToken();
  const { noteList, setNotesList } = useNotesList();

  const handleAddNote = async (e) => {
    e.preventDefault();
    console.log(title.length, description.length);
    if (title.length === 0 || description.length === 0) {
      return;
    }
    try {
      const response = await axios.post(
        '/api/notes',
        { note },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201) {
        setNotesList([...response.data.notes]);
        noteDispatch({ type: 'ADD' });
      }
      console.log(response.data.notes);
    } catch (e) {
      console.error(e);
    }
  };

  return display ? (
    <div className="modal-container notes-modal-container">
      <div className="modal shadow ">
        <button
          onClick={() => {
            noteDispatch({ type: 'DISPLAY', payload: !display });
          }}
          className="btn btn-float close"
        >
          <span className="fa-solid fa-xmark"></span>
        </button>
        {/* <div class="modal-head margin-t-b-5">
        <h1 class="modal-heading">Diwali Sale</h1>
      </div>
      <div class="modal-content margin-b-10 padding-1r">
        <p class="medium-text muted-text-color">
          Hurry!!! limited time deal on all products.
        </p>
      </div>
      <div class="modal-foot margin-t-5">
        <button class="btn btn-accented">Shop</button>
      </div> */}
        <form className="modal-form" onClick={(e) => e.stopPropagation()}>
          <div className="form-content">
            <h2 className="text-left modal-title">
              <label htmlFor="title">Title</label>
            </h2>
            <input
              onChange={(e) =>
                noteDispatch({ type: 'TITLE', payload: e.target.value })
              }
              class="textbox modal-input-title"
              id="title"
              type="text"
              value={title}
            />
          </div>
          <div className="form-content">
            <h2 className="text-left modal-description">
              <label htmlFor="description">Description</label>
            </h2>
            <textarea
              onChange={(e) =>
                noteDispatch({ type: 'DESCRIPTION', payload: e.target.value })
              }
              className="textbox textbox-area modal-input-textarea"
              id="description"
              value={description}
            ></textarea>
          </div>
          <div className="form-bottom">
            <button className="btn btn-primary" onClick={handleAddNote}>
              Add
            </button>
            <input
              onChange={(e) =>
                noteDispatch({ type: 'COLOR', payload: e.target.value })
              }
              type="color"
            />
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
