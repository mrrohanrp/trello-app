import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';

const propTypes = {
  /** Description for Card List */
  description: PropTypes.string.isRequired
};

const CardDisplay = ({ description }) => {
  return (
    <div className={`${styles.card_display} card mb-1 px-2 py-1 bg-light`}>
      <p className="mb-0">{description}</p>
    </div>
  );
};

CardDisplay.propTypes = propTypes;

export default CardDisplay;
