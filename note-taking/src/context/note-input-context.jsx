import React, { useReducer, createContext, useContext } from 'react';

const NoteInputContext = createContext();

const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'TITLE':
      return { ...state, note: { ...state.note, title: action.payload } };
    case 'DESCRIPTION':
      return { ...state, note: { ...state.note, description: action.payload } };
    case 'COLOR':
      return { ...state, note: { ...state.note, color: action.payload } };
    case 'WORK':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, work: !state.note.tags.work },
        },
      };
    case 'HOMEWORK':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, homework: !state.note.tags.homework },
        },
      };
    case 'CREATIVE':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, creative: !state.note.tags.creative },
        },
      };
    case 'EXERCISE':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, exercise: !state.note.tags.exercise },
        },
      };
    case 'DISPLAY':
      return { ...state, display: action.payload };
    case 'CLEAR_AFTER_ADD':
      return action.payload;

    default:
      return state;
  }
};

export const NoteInputProvider = ({ children }) => {
  const [{ note, display, editId }, noteDispatch] = useReducer(reducerFunc, {
    note: {
      title: '',
      description: '',
      color: 'white',
      tags: { work: false, homework: false, creative: false, exercise: false },
    },
    display: false,
    editId: '',
  });
  return (
    <NoteInputContext.Provider value={{ note, display, noteDispatch, editId }}>
      {children}
    </NoteInputContext.Provider>
  );
};

export const useNoteInputContext = () => useContext(NoteInputContext);
