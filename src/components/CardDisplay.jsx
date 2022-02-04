import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const propTypes = {
  /** Card ID for Card List */
  cardId: PropTypes.string.isRequired,
  /** onClick for Card List */
  onClick: PropTypes.func.isRequired
};

const CardDisplay = ({ cardId, onClick }) => {
  const description = useSelector((state) => state.cards[cardId].description);

  return (
    <div className={`${styles.card_display} card mb-1 px-2 py-1 bg-light container`}>
      <div className="row mx-0">
        <div className="col-11 px-0 mb-0">{description}</div>
        <div className="col-1 px-0">
          <Button
            variant="light"
            className="p-1 card-edit-button"
            onClick={() => onClick(cardId, description)}
          >
            🖋
          </Button>
        </div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = propTypes;

export default CardDisplay;
