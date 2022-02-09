import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import styles from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CREATELIST, DELETELIST, UPDATEBOARD, DELETEBOARD, UPDATEUI } from '../store/actions';
import { Button } from 'react-bootstrap';
import { getNewId } from '../utils/utils';
import { Link } from 'react-router-dom';
import ListContainer from './ListContainer';
import { ScrollX } from './Scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  /** Board ID for board */
  boardId: PropTypes.string.isRequired
};

const Board = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState(null);
  const inputRef = useRef();

  const lists = useSelector((state) => state.boards[boardId].lists);
  const name = useSelector((state) => state.boards[boardId].name);
  const starred = useSelector((state) => state.boards[boardId].starred);
  const listUS = useSelector((state) => state.lists);
  const cards = lists.reduce((prev, id) => [...prev, ...listUS[id].cards], []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UPDATEBOARD({ boardId, newValues: { accessed: new Date() } }));
  }, [boardId, dispatch]);

  const handleAddList = () => {
    setIsAdding(true);
  };

  const handleChange = (e) => {
    setListName(e.target.value);
  };

  const handleSaveList = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (listName) {
        const listId = 'l' + getNewId();
        dispatch(CREATELIST({ boardId, listId, name: listName }));
        setListName(null);
        inputRef.current.value = null;
        setIsAdding(false);
      }
    }
  };

  const handleCancelList = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === 'add-list-btn') {
      inputRef.current.focus();
    } else {
      setIsAdding(false);
      setListName(null);
    }
  };

  const handleDeleteList = (listId, cards) => {
    dispatch(DELETELIST({ listId, boardId, cardIds: cards }));
  };

  const handleDeleteBoard = () => {
    dispatch(UPDATEUI({ color: 'blue', img: null }));
    dispatch(DELETEBOARD({ boardId, cardIds: cards, listIds: lists }));
  };

  const handleStarred = () => {
    dispatch(UPDATEBOARD({ boardId, newValues: { starred: !starred } }));
  };

  return (
    <>
      {lists ? (
        <div className="d-flex flex-column w-100 h-100 pb-2 px-2">
          {/**
           * Board Header
           */}
          <div className="row mx-0 mb-3 align-items-center text-white">
            <div className="col-auto">
              <h3>{name}</h3>
            </div>
            <div className="col-auto">
              <button type="button" className="btn" onClick={handleStarred}>
                <FontAwesomeIcon
                  icon={starred ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                  className={`hover-transform ${
                    starred ? 'text-warning' : 'text-trans text-trans-hover'
                  }`}
                />
              </button>
            </div>
            <div className="col-auto ms-auto">
              <Link type="button" className="btn" onClick={handleDeleteBoard} to="/">
                <FontAwesomeIcon icon="fa-solid fa-trash" className="text-trans text-trans-hover" />
              </Link>
            </div>
          </div>

          <ScrollX mods="d-flex flex-row h-100 ">
            {/**
             * for list
             */}
            {lists.map((listId, index) => (
              <div className="col-auto ms-0 me-2 px-0" key={listId}>
                <ListContainer index={index} boardId={boardId}>
                  <List boardId={boardId} listId={listId} onDeleteList={handleDeleteList} />
                </ListContainer>
              </div>
            ))}

            <ListContainer index={lists.length} boardId={boardId} />

            {/**
             * button for adding lists
             */}
            <div className="col-auto" key="add">
              {isAdding ? (
                <div className={`${styles.board_list} card`}>
                  <div className="d-flex flex-column p-2">
                    {/**
                     * input for list
                     */}
                    <input
                      ref={inputRef}
                      id="list-input"
                      type="text"
                      className="form-control"
                      placeholder="Enter list title..."
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleCancelList}
                      onKeyPress={handleSaveList}
                    />

                    <div className="pt-2">
                      <Button id="add-list-btn" variant="primary" onClick={handleSaveList}>
                        Add List
                      </Button>
                      <Button
                        variant="close"
                        className="mx-2"
                        aria-label="close"
                        onClick={handleCancelList}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  className={`${styles.board_list_add} text-start text-white bg-trans bg-trans-hover border-0 px-3 text-decoration-none`}
                  onClick={handleAddList}
                >
                  <FontAwesomeIcon icon="plus" className="small" />
                  {lists?.length ? ' Add another list' : ' Add a list'}
                </Button>
              )}
            </div>
          </ScrollX>
        </div>
      ) : (
        /**
         * show if board not found
         */
        <div className="row justify-content-center text-center">
          <div className="d-flex flex-column">
            <h1 className="text-danger fw-bold">Error</h1>
            <h5>{`The requested board "${name}" does not exist...`}</h5>
          </div>
        </div>
      )}
    </>
  );
};

Board.propTypes = propTypes;

export default Board;
