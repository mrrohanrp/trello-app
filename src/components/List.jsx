import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CREATECARD, DELETECARD, UPDATECARD } from '../store/actions';

import Card from './Card';
import CardInput from './CardInput';
import CardContainer from './CardContainer';
import { getNewId } from '../utils/utils';
import { ScrollY } from './ui/Scroll';
import styles from './List.module.scss';

import { useDrag } from 'react-dnd';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  /** List ID for the List  */
  listId: PropTypes.string.isRequired,
  /** Board ID for the List  */
  boardId: PropTypes.string,
  /** Delete list function for the List  */
  onDeleteList: PropTypes.func
};

const List = ({ listId, boardId, onDeleteList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardText, setCardText] = useState(null);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();

  const name = useSelector((state) => state.lists[listId].name);
  const cardsUS = useSelector((state) => state.lists[listId].cards);

  useMemo(() => setCards(cardsUS), [cardsUS]);

  const dispatch = useDispatch();

  const handleAddCard = (e) => {
    if (!e.key || e.key === 'Enter') {
      setIsAdding(true);
    }
  };

  const handleSaveCard = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (cardText) {
        const cardId = 'c' + getNewId();
        dispatch(CREATECARD({ cardId, listId, description: cardText }));
        setCardText({ cardText });
        inputRef.current.value = null;
        setIsAdding(false);
      }
    }
  };

  const handleCancelCard = (e) => {
    if (!e.relatedTarget || !['add-card-btn', 'delete-card-btn'].includes(e.relatedTarget.id)) {
      setIsAdding(false);
      setCardText(null);
      setEditId(null);
    }
  };

  const handleDeleteCard = () => {
    dispatch(DELETECARD({ listId, cardId: editId }));
    setEditId(null);
    setCardText(null);
  };

  const handleChange = (e) => {
    setCardText(e.target.value);
  };

  const handleStartEdit = (key, desc) => {
    setEditId(key);
    setCardText(desc);
  };

  const handleSaveEdit = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (cardText) {
        dispatch(UPDATECARD({ cardId: editId, newValues: { description: cardText } }));
        setCardText(null);
        setEditId(null);
      }
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: { id: listId, originId: boardId, type: 'LIST' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div ref={drag} className={`${styles.list} card ${isDragging ? 'd-none' : ''}`}>
      <div className="card-title d-flex px-0 pt-1">
        <h3 className="card-title mb-0 ms-3 mt-2">{name}</h3>
        <button
          onClick={() => onDeleteList(listId, cards)}
          className={`${styles.delete_list_btn} btn px-2 ms-auto`}
        >
          <FontAwesomeIcon className="text-trans-dark text-trans-dark-hover" icon="trash" />
        </button>
      </div>
      {/**
       * multiple editable cards in the list
       */}
      <ScrollY mods="card-body px-1 py-0 mx-1">
        {cards &&
          cards.map((cardId, index) => {
            if (cardId === editId) {
              return (
                /**
                 * card edit section
                 */
                <div className="container-fluid mb-3 px-0" key={cardId}>
                  <div className="row mx-0">
                    <div className="col-12 p-0">
                      <CardInput
                        id="card-input"
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyPress={handleSaveEdit}
                        onBlur={handleCancelCard}
                        placeholder="Enter card description..."
                        defaultValue={cardText}
                      />
                    </div>
                  </div>
                  <div className="row mx-0 mt-1 justify-content-between">
                    <div className="col-auto p-0">
                      <Button
                        variant="success"
                        id="add-card-btn"
                        className="me-2"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </Button>
                      <Button variant="danger" id="delete-card-btn" onClick={handleDeleteCard}>
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
              <CardContainer index={index} listId={listId} key={cardId}>
                <Card cardId={cardId} listId={listId} onClick={handleStartEdit} />
              </CardContainer>
            );
          })}

        <CardContainer index={cards.length} listId={listId} />

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
      </ScrollY>

      {/**
       *  show add/cancel button for adding card or
       *  show `add card` placeholder
       */}
      {isAdding ? (
        <div className="p-2">
          <Button id="add-card-btn" variant="primary" onClick={handleSaveCard}>
            Add Card
          </Button>
          <Button variant="close" className="mx-2" aria-label="close" onClick={handleCancelCard} />
        </div>
      ) : (
        <div
          className={`${styles.list_footer} card-footer text-secondary border-top-0 px-4 pb-3 pt-0 text-decoration-none`}
          role="button"
          tabIndex={0}
          onKeyPress={handleAddCard}
          onClick={handleAddCard}
        >
          <FontAwesomeIcon icon="plus" className="small" />
          {' Add a card'}
        </div>
      )}
    </div>
  );
};

List.propTypes = propTypes;

export default List;
