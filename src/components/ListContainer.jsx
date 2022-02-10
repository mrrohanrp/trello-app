import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADDLIST, MOVELIST, REMOVELIST } from '../store/actions';
import styles from './ListContainer.module.scss';

const propTypes = {
  /** Board ID for board */
  boardId: PropTypes.string.isRequired,
  /** List index  */
  index: PropTypes.number.isRequired,
  /** Child components */
  children: PropTypes.node
};

const ListContainer = ({ boardId, index, mods, children }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: 'LIST',
    drop(droppedItem) {
      if (droppedItem.originId !== boardId) {
        dispatch(REMOVELIST({ index, boardId: droppedItem.originId, listId: droppedItem.id }));
        dispatch(ADDLIST({ index, boardId, listId: droppedItem.id }));
      }
      dispatch(MOVELIST({ index, boardId, listId: droppedItem.id }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div ref={drop} className={`list-container ${mods} pb-1`}>
      {/**
       * List drop preview
       */}
      {isOver && <div className={`card mb-4  ${styles.drop_preview}`} />}
      {/**
       * Lists
       */}
      {children}
    </div>
  );
};

ListContainer.propTypes = propTypes;

export default ListContainer;
