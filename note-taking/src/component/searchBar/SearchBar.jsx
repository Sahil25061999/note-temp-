import React from 'react';
import './SearchBar.css';
export const SearchBar = () => {
  return (
    <div className="search-container">
      <input className="textbox" type="text" placeholder="Search notes" />
      <button className="btn btn-only-icon btn-square">
        <span className="fa-solid fa-magnifying-glass"></span>
      </button>
    </div>
  );
};
