import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADDCARD, MOVECARD, REMOVECARD } from '../store/actions';
import { useDrop } from 'react-dnd';
import styles from './CardContainer.module.scss';

const propTypes = {
  /** List ID for board */
  listId: PropTypes.string.isRequired,
  /** Card index  */
  index: PropTypes.number.isRequired,
  /** Child components Cards */
  children: PropTypes.node
};

const CardContainer = ({ listId, index, children }) => {
  const dispatch = useDispatch();

  const [{ isOver, draggedItem }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop(droppedItem) {
      if (droppedItem.originId !== listId) {
        dispatch(REMOVECARD({ index, listId: droppedItem.originId, cardId: droppedItem.id }));
        dispatch(ADDCARD({ index, listId, cardId: droppedItem.id }));
      }
      dispatch(MOVECARD({ index, listId, cardId: droppedItem.id }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      draggedItem: monitor.getItem()
    })
  }));

  const description = useSelector((state) => {
    return isOver && state.cards[draggedItem.id].description;
  });

  return (
    <div ref={drop} className="card-container pb-1">
      {/**
       * Card drop preview
       */}
      {isOver && (
        <div className={`card mb-1 px-2 py-1 bg-light container ${styles.drop_preview}`}>
          <div className="row mx-0">
            <div className="col-11 px-0 mb-0">{description}</div>
          </div>
        </div>
      )}
      {/**
       * Cards
       */}
      {children}
    </div>
  );
};

CardContainer.propTypes = propTypes;

export default CardContainer;
