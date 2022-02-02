import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Outlet, Link } from 'react-router-dom';
import { UPDATECOLOR } from '../store/actions';

import styles from './Layout.module.scss';

const Layout = () => {
  const colorUS = useSelector((state) => state.modify.color);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column vh-100">
      <nav className={`navbar container-fluid bg-dark-${colorUS}`}>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link fw-bold text-white bg-light-${colorUS}-hover px-2 py-0 rounded`}
              onClick={() => {
                dispatch(UPDATECOLOR({ color: 'blue' }));
              }}
            >
              <div className={` ${styles.logo}`} />
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
