import React, { useEffect, useState } from 'react';
import { useNotesList } from '../../context/notes-list-context';
import axios from 'axios';
import { useNoteInputContext } from '../../context/note-input-context';
import './NotesInputModal.css';
import { useToken } from '../../context/token-context';

export const NotesInputModal = () => {
  const { note, display, noteDispatch, editId } = useNoteInputContext();
  const { title, description, color } = note;
  const { token } = useToken();
  const { noteList, setNotesList } = useNotesList();
  const { work, exercise, homework, creative } = note.tags;

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      return;
    }
    try {
      const response = await axios.post(
        `/api/notes${editId ? `/${editId}` : ''}`,
        { note },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201) {
        setNotesList([...response.data.notes]);
        noteDispatch({
          type: 'CLEAR_AFTER_ADD',
          payload: {
            note: {
              title: '',
              description: '',
              color: 'white',
              tags: {
                work: false,
                homework: false,
                creative: false,
                exercise: false,
              },
            },
            display: false,
            editId: '',
          },
        });
      }
      console.log(response.data.notes);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(note.tags);

  return display ? (
    <div className="modal-container notes-modal-container">
      <div className="modal shadow notes-modal ">
        <button
          onClick={() => {
            noteDispatch({ type: 'DISPLAY', payload: !display });
          }}
          className="btn btn-float close"
        >
          <span className="fa-solid fa-xmark"></span>
        </button>

        <form className="modal-form" onClick={(e) => e.stopPropagation()}>
          {/*                   TITLE BOX                           */}
          <div className="form-content">
            <h3 className="text-left modal-title">
              <label htmlFor="title">
                <strong>Title</strong>
              </label>
            </h3>
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

          {/*                   Tags                           */}
          <div className="form-content tags">
            <h4 className="text-left modal-title">
              <label htmlFor="title">
                <strong>Tags</strong>
              </label>
            </h4>
            <div className="checkbox-container">
              <label className="margin-r-10">
                <input
                  name="work"
                  className="checkbox "
                  id="work"
                  type="checkbox"
                  checked={work}
                  onChange={() => {
                    noteDispatch({ type: 'WORK' });
                  }}
                  value="work"
                />
                Work
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox "
                  id="homework"
                  name="homework"
                  type="checkbox"
                  checked={homework}
                  onChange={() => {
                    noteDispatch({ type: 'HOMEWORK' });
                  }}
                  value="homework"
                />
                Homework
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox "
                  id="exercise"
                  name="exercise"
                  type="checkbox"
                  checked={exercise}
                  onChange={() => {
                    noteDispatch({ type: 'EXERCISE' });
                  }}
                  value="exercise"
                />
                Exercise
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox"
                  id="creative"
                  name="creative"
                  type="checkbox"
                  checked={creative}
                  onChange={() => {
                    noteDispatch({ type: 'CREATIVE' });
                  }}
                  value="creative"
                />
                Creative
              </label>
            </div>
          </div>
          {/*                   Description BOX                           */}
          <div className="form-content">
            <h3 className="text-left modal-description">
              <label htmlFor="description">
                <strong>Description</strong>
              </label>
            </h3>
            <textarea
              onChange={(e) =>
                noteDispatch({ type: 'DESCRIPTION', payload: e.target.value })
              }
              className="textbox textbox-area modal-input-textarea"
              id="description"
              value={description}
            ></textarea>
          </div>
          {/*                   Button BOX                           */}
          <div className="form-bottom">
            <button className="btn btn-primary" onClick={handleAddNote}>
              Add
            </button>
            <input
              onChange={(e) =>
                noteDispatch({ type: 'COLOR', payload: e.target.value })
              }
              type="color"
              value={color}
            />
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
