import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeServer } from './server';
import {
  TokenProvider,
  NotesListProvider,
  NoteInputProvider,
  ArchivesListProvider,
} from './context/context-index';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TokenProvider>
        <ArchivesListProvider>
          <NotesListProvider>
            <NoteInputProvider>
              <App />
            </NoteInputProvider>
          </NotesListProvider>
        </ArchivesListProvider>
      </TokenProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
