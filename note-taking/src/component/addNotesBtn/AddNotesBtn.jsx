import React from 'react';
import axios from 'axios';
import './AddNotesBtn.css';
import { useToken, useNotesList } from '../../context/context-index';
import { useNoteInputContext } from '../../context/note-input-context';
export const AddNoteBtn = () => {
  const { display, noteDispatch } = useNoteInputContext();
  const handleAddClick = () => {
    noteDispatch({ type: 'DISPLAY', payload: !display });
  };

  return (
    <button className="add-button" onClick={handleAddClick}>
      <span className="add-button-icon fas fa-plus-circle"></span>
    </button>
  );
};
