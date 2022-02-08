import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Outlet, Link } from 'react-router-dom';
import { UPDATEUI } from '../store/actions';

import styles from './Layout.module.scss';

const Layout = () => {
  const color = useSelector((state) => state.ui.color);
  const img = useSelector((state) => state.ui.img);

  const dispatch = useDispatch();

  return (
    <div className={`d-flex flex-column vh-100 ${img ? `bg-img-${img}` : `bg-${color}`}`}>
      <nav className={`navbar container-fluid bg-trans-dark`}>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link fw-bold text-white bg-trans-hover px-2 py-0 rounded`}
              onClick={() => {
                dispatch(UPDATEUI({ color: 'blue', img: null }));
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
