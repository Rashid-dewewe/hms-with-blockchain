import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-3 btn btn-primary fw-bold text-white" to="/">HMS</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link active" to="/" aria-current="page">Home</Link>
          {!user ? (
            <>
              <Link className="nav-link" to="/signup">Sign up</Link>
              <Link className="nav-link" to="/signin">Sign in</Link>
            </>
          ) : (
            <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;