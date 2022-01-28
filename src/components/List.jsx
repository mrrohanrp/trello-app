import React, { useRef, useState } from 'react';
import CardDisplay from './CardDisplay';
import CardInput from './CardInput';
import styles from './List.module.scss';

const List = (props) => {
  const [adding, setAdding] = useState(false);
  const [cards, setCards] = useState(props.cards || []);
  const [newCard, setNewCard] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const handleInputCard = (e) => {
    if ((e.type === 'keypress' && e.key === 'Enter') || e.type === 'click') {
      setAdding(true);
    }
  };

  const handleSaveCard = (e) => {
    if ((e.type === 'keypress' && e.key === 'Enter') || e.type === 'click') {
      if (newCard) {
        const prevCards = cards.slice();
        inputRef.current.value = null;
        if (newCard) prevCards.push(newCard);
        setCards(prevCards);
      }
      e.preventDefault();
    }
  };

  const handleCancelCard = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === 'add-card') {
      inputRef.current.focus();
      btnRef.current.click();
    } else {
      setAdding(false);
    }
    setAdding(false);
  };

  const handleChange = (e) => {
    setNewCard(e.target.value);
  };

  return (
    <div className={`${styles.list} card mb-4`}>
      <h6 className="card-title mb-0 ms-3 mt-1">{props.title}</h6>
      <div className="card-body p-2">
        {cards && cards.map((desc) => <CardDisplay key={desc} description={desc} />)}
        {adding && (
          <CardInput
            id="card-input"
            ref={inputRef}
            onChange={handleChange}
            onKeyPress={handleSaveCard}
            onBlur={handleCancelCard}
          />
        )}
      </div>
      {adding ? (
        <div className="p-2">
          <button
            id="add-card"
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
          className={`${styles.list_footer} card-footer text-secondary p-2`}
          role="button"
          tabIndex={0}
          onKeyPress={handleInputCard}
          onClick={handleInputCard}
        >
          {cards?.length ? '+ Add another card' : '+ Add a card'}
        </div>
      )}
    </div>
  );
};

export default List;
