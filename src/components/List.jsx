import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ADDCARD, MODIFYCARD } from '../store/actions';
import CardDisplay from './CardDisplay';
import CardInput from './CardInput';
import styles from './List.module.scss';
import { Button } from 'react-bootstrap';

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
  const [cardText, setCardText] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

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
      if (cardText) {
        dispatch(MODIFYCARD({ board, list: title, card: cardText }));
        setCardText({ cardText });
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
      setCardText(null);
      setEditIndex(null);
    }
    /*  setIsAdding(false); */
  };

  const handleChange = (e) => {
    setCardText(e.target.value);
  };

  const handleStartEdit = (index, desc) => {
    setEditIndex(index);
    setCardText(desc);
  };

  const handleSaveEdit = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (cardText) {
        dispatch(MODIFYCARD({ board, list: title, card: cardText, index: editIndex }));
        setCardText(null);
        setEditIndex(null);
      }
      e.preventDefault();
    }
  };

  return (
    <div className={`${styles.list} card mb-4`}>
      <h6 className="card-title mb-0 ms-3 mt-2">{title}</h6>
      {/**
       * multiple editable cards in the list
       */}
      <div className="card-body px-2 py-0 mt-2">
        {cards &&
          cards.map((desc, index) => {
            if (editIndex === index) {
              return (
                /**
                 * card edit section
                 */
                <div className="container-fluid mb-3 px-0" key={desc}>
                  <div className="row mx-0">
                    <div className="col-12 p-0">
                      <CardInput
                        id="card-input"
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyPress={handleSaveEdit}
                        onBlur={handleCancelCard}
                        placeholder="Enter card description..."
                        defaultValue={desc}
                      />
                    </div>
                  </div>
                  <div className="row mx-0 mt-1 justify-content-between">
                    <div className="col-auto p-0">
                      <Button
                        variant="success"
                        ref={btnRef}
                        id="add-card-btn"
                        className="me-2"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </Button>
                      <Button variant="danger" id="delete-card-btn" onClick={handleCancelCard}>
                        Delete
                      </Button>
                    </div>
                    <div className="col-auto p-0">
                      <Button
                        variant="close"
                        className="btn-close btn my-2"
                        onClick={handleCancelCard}
                      />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <CardDisplay
                key={desc}
                description={desc}
                onClick={() => handleStartEdit(index, desc)}
              />
            );
          })}

        {/**
         *  textarea for adding card
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
       *  show add/cancel button for adding card or
       *  show `add card` placeholder
       */}
      {isAdding ? (
        <div className="p-2">
          <Button id="add-card-btn" ref={btnRef} variant="primary" onClick={handleSaveCard}>
            Add Card
          </Button>
          <Button variant="close" className="mx-2" aria-label="close" onClick={handleCancelCard} />
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
