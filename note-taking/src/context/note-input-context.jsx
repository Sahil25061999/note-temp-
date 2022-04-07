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
    case 'TAGS':
      return {
        ...state,
        note: { ...state.note, tags: [...state.note.tags, ...action.payload] },
      };
    case 'DISPLAY':
      return { ...state, display: action.payload };
    case 'ADD':
      return {
        ...state,
        note: {
          ...state.note,
          title: '',
          description: '',
          color: 'white',
          tags: [],
        },
        display: false,
      };
    default:
      return state;
  }
};

export const NoteInputProvider = ({ children }) => {
  const [{ note, display }, noteDispatch] = useReducer(reducerFunc, {
    note: { title: '', description: '', color: 'white', tags: [] },
    display: false,
  });
  return (
    <NoteInputContext.Provider value={{ note, display, noteDispatch }}>
      {children}
    </NoteInputContext.Provider>
  );
};

export const useNoteInputContext = () => useContext(NoteInputContext);
