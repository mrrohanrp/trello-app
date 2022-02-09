import React from 'react';
import PropTypes from 'prop-types';
import styles from './Scroll.module.scss';

const propTypesX = {
  /** child components for X axis scroll */
  children: PropTypes.node
};

const ScrollX = ({ children, mods }) => {
  return <div className={`${styles.scrollX} ${mods}`}>{children}</div>;
};

ScrollX.propTypes = propTypesX;

const propTypesY = {
  /** child components for Y axis scroll */
  children: PropTypes.node
};
const ScrollY = ({ children, mods }) => {
  return <div className={`${styles.scrollY} ${mods}`}>{children}</div>;
};

ScrollY.propTypes = propTypesY;

export { ScrollX, ScrollY };
