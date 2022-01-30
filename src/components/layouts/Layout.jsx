import React from 'react';

import { Outlet, NavLink } from 'react-router-dom';

console.clear();

const Layout = (props) => {
  return (
    <div className="d-flex flex-column">
      <nav className="navbar-expand bg-dark container-fluid">
        <ul className="navbar-nav row mx-0 align-items-center">
          <li className="nav-item col-4 px-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link fw-bold text-white' : 'nav-link fw-bold text-primary'
              }
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-icon="home"
                role="img"
                height={16}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 60 576 512"
              >
                <path
                  fill="currentColor"
                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                ></path>
              </svg>
              <span class="mx-2">Trello</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
