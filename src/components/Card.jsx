import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Card.module.scss';

const propTypes = {
  /** Card ID for Card List */
  cardId: PropTypes.string.isRequired,
  /** List ID for Card List */
  listId: PropTypes.string,
  /** onClick for Card List */
  onClick: PropTypes.func
};

const Card = ({ cardId, listId, onClick }) => {
  const description = useSelector((state) => state.cards[cardId].description);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: cardId, originId: listId, type: 'CARD' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`${styles.card_display} card mb-1 px-2 py-1 bg-light container ${
        isDragging ? 'd-none' : ''
      }`}
    >
      <div className="row mx-0" onClick={() => onClick(cardId, description)}>
        <div className="col-11 px-0 mb-0">{description}</div>
        <div className="col-1 px-0">
          <FontAwesomeIcon
            icon="fa-solid fa-pen"
            className={`${styles.card_edit_button} p-0 text-trans-dark text-trans-dark-hover`}
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
