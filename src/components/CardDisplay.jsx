import React from 'react';
import styles from './CardDisplay.module.scss';

const CardDisplay = ({ description }) => {
  return (
    <div className={`${styles.card_display} card mb-1 px-2 py-1 bg-light`}>
      <p>{description}</p>
    </div>
  );
};

export default CardDisplay;
