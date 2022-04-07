import React, { useEffect } from 'react';
import { useArchivesList, useToken } from '../../context/context-index';
import axios from 'axios';
import './Archive.css';
import { NoteCard } from '../../component/noteCard/NoteCard';

export const Archive = () => {
  const { token } = useToken();
  const { archivesList, setArchivesList } = useArchivesList();
  useEffect(() => {
    console.log(token);
    (async () => {
      try {
        const archiveResponse = await axios.get('/api/archives/', {
          headers: { authorization: token },
        });
        setArchivesList(archiveResponse.data.archives);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <div className="main-page">
      <main>
        {archivesList.length !== 0 &&
          archivesList.map((item) => {
            return <NoteCard key={item._id} item={item} />;
          })}
      </main>
    </div>
  );
};
