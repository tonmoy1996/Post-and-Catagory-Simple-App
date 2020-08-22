import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='true'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <Link className='navbar-brand' to='/'>
        Blog
      </Link>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <div className='navbar-nav'>
          <NavLink className='nav-item nav-link' to='/post'>
            Posts
          </NavLink>
          <NavLink className='nav-item nav-link' to='/post-create'>
            Create Post
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
