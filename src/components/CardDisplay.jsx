import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const propTypes = {
  /** Card ID for Card List */
  cardId: PropTypes.string.isRequired,
  /** List ID for Card List */
  listId: PropTypes.string,
  /** onClick for Card List */
  onClick: PropTypes.func
};

const CardDisplay = ({ cardId, listId, onClick }) => {
  const description = useSelector((state) => state.cards[cardId].description);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: cardId, originId: listId, type: 'CARD' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`${styles.card_display} card mb-1 px-2 py-1 bg-light container ${
        isDragging ? 'd-none' : ''
      }`}
    >
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
