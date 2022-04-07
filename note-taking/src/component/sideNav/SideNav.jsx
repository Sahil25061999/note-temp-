import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.css';

export const SideNav = () => {
  return (
    <nav className="sidebar">
      <NavLink to="/" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-house"></span>{' '}
        <span className="sidebar-link-text">Home</span>
      </NavLink>
      <NavLink to="/label" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-hashtag"></span>{' '}
        <span className="sidebar-link-text">Label</span>
      </NavLink>
      <NavLink to="/archive" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-box-archive"></span>{' '}
        <span className="sidebar-link-text">Archive</span>
      </NavLink>
      <NavLink to="/trash" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-trash"></span>{' '}
        <span className="sidebar-link-text">Trash</span>
      </NavLink>
      <NavLink to="/profile" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-user"></span>
        {'  '}
        <span className="sidebar-link-text">Profile</span>
      </NavLink>
    </nav>
  );
};
