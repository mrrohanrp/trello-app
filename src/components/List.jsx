import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ADDCARD } from '../store/actions';
import CardDisplay from './CardDisplay';
import CardInput from './CardInput';
import styles from './List.module.scss';

const propTypes = {
  /** Board Name  */
  board: PropTypes.string.isRequired,
  /** List Title  */
  title: PropTypes.string.isRequired,
  /** List Cards  */
  cards: PropTypes.arrayOf(PropTypes.string).isRequired
};

const List = ({ board, title, cards: card }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cards, setCards] = useState(card || []);
  const [newCard, setNewCard] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  useMemo(() => setCards(card), [card]);

  const dispatch = useDispatch();

  const handleAddCard = (e) => {
    if (!e.key || e.key === 'Enter') {
      setIsAdding(true);
    }
  };

  const handleSaveCard = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (newCard) {
        dispatch(ADDCARD({ board, list: title, newCard }));
        setNewCard({ newCard });
        inputRef.current.value = null;
      }
      // no new line after enter
      e.preventDefault();
    }
  };

  const handleCancelCard = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === 'add-card-btn') {
      inputRef.current.focus();
      btnRef.current.click();
    } else {
      setIsAdding(false);
    }
    setIsAdding(false);
  };

  const handleChange = (e) => {
    setNewCard(e.target.value);
  };

  return (
    <div className={`${styles.list} card mb-4`}>
      <h6 className="card-title mb-0 ms-3 mt-1">{title}</h6>
      <div className="card-body p-2">
        {cards && cards.map((desc) => <CardDisplay key={desc} description={desc} />)}
        {/**
         * for adding card show textarea
         */}
        {isAdding && (
          <CardInput
            id="card-input"
            ref={inputRef}
            onChange={handleChange}
            onKeyPress={handleSaveCard}
            onBlur={handleCancelCard}
          />
        )}
      </div>
      {/**
       * for adding card show add and cancel button and
       * for not adding card show add placeholder
       */}
      {isAdding ? (
        <div className="p-2">
          <button
            id="add-card-btn"
            ref={btnRef}
            type="button"
            className="btn btn-primary"
            onClick={handleSaveCard}
          >
            Add Card
          </button>
          <button
            type="button"
            className="btn-close btn mx-2"
            aria-label="close"
            onClick={handleCancelCard}
          />
        </div>
      ) : (
        <div
          className={`${styles.list_footer} card-footer text-secondary p-2 border-top-0`}
          role="button"
          tabIndex={0}
          onKeyPress={handleAddCard}
          onClick={handleAddCard}
        >
          {cards?.length ? '+ Add another card' : '+ Add a card'}
        </div>
      )}
    </div>
  );
};

List.propTypes = propTypes;

export default List;
