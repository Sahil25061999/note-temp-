import React, { useContext, createContext } from 'react';
import { useState, useEffect } from 'react';
import { useToken } from './context-index';
import axios from 'axios';
const NotesListContext = createContext(null);

const NotesListProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  const { token } = useToken();

  return (
    <NotesListContext.Provider value={{ notesList, setNotesList }}>
      {children}
    </NotesListContext.Provider>
  );
};

const useNotesList = () => useContext(NotesListContext);

export { useNotesList, NotesListProvider };
