import React, { useContext, createContext } from 'react';
import { useState, useEffect } from 'react';
import { useToken } from './context-index';
import axios from 'axios';
const ArchivesListContext = createContext(null);

const ArchivesListProvider = ({ children }) => {
  const [archivesList, setArchivesList] = useState([]);
  const { token } = useToken();

  return (
    <ArchivesListContext.Provider value={{ archivesList, setArchivesList }}>
      {children}
    </ArchivesListContext.Provider>
  );
};

const useArchivesList = () => useContext(ArchivesListContext);

export { useArchivesList, ArchivesListProvider };
