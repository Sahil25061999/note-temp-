import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useToken } from '../../context/context-index';
import { SearchBar } from '../component-index';
import './Navbar.css';

export const Navbar = () => {
  const { token, setToken } = useToken();
  const handleLogout = () => {
    setToken(localStorage.clear());
    setCartData([]);
    setWishlistData([]);
  };
  return (
    <>
      <header className="navbar home-navbar">
        <div className="logo-container">
          <h2>
            <NavLink to="/">Take Notes</NavLink>
          </h2>
        </div>
        <SearchBar />
        <nav className="navbar-menu">
          <ul className="navbar-list list-style-none">
            {token ? (
              <li className="navbar-item">
                <Link
                  onClick={handleLogout}
                  to="/logout"
                  className="btn navbar-link"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="navbar-item">
                  <NavLink to="/login" className="navbar-link btn">
                    Login
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/signup" className="navbar-link btn btn-black">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}

            <li className="navbar-item hamburger-icon">
              <a href="#" className="navbar-link btn">
                <span className="fa-solid fa-bars"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
