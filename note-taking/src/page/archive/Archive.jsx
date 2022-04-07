import React, { useEffect } from 'react';
import { useArchivesList, useToken } from '../../context/context-index';
import axios from 'axios';
import './Archive.css';
import { NoteCard } from '../../component/noteCard/NoteCard';

export const Archive = () => {
  const { token } = useToken();
  const { archivesList, setArchivesList } = useArchivesList();

  return (
    <div className="main-page">
      <main>
        {archivesList.length !== 0 &&
          archivesList.map((item) => {
            return <NoteCard key={item._id} item={item} archive={true} />;
          })}
      </main>
    </div>
  );
};
