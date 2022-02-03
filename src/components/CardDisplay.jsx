import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';

const propTypes = {
  /** Description for Card List */
  description: PropTypes.string.isRequired,
  /** Description for Card List */
  onClick: PropTypes.func.isRequired
};

const CardDisplay = ({ description, onClick }) => {
  return (
    <div className={`${styles.card_display} card mb-1 px-2 py-1 bg-light container`}>
      <div className="row mx-0">
        <div className="col-11 px-0 mb-0">{description}</div>
        <div className="col-1 px-0">
          <button type="button" className="btn p-1 card-edit-button" onClick={onClick}>
            🖋
          </button>
        </div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = propTypes;

export default CardDisplay;
