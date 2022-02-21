import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CREATELIST, DELETELIST, UPDATEBOARD, DELETEBOARD, UPDATEUI } from '../store/actions';
import { Link } from 'react-router-dom';

import List from './List';
import ListContainer from './ListContainer';
import { getNewId } from '../utils/utils';
import { ScrollX } from './ui/Scroll';
import styles from './Board.module.scss';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  /** Board ID for board */
  boardId: PropTypes.string.isRequired
};

const Board = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState(null);
  const inputRef = useRef();

  const [boardText, setBoardText] = useState(null);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);

  const lists = useSelector((state) => state.boards[boardId].lists);
  const name = useSelector((state) => state.boards[boardId].name);
  const starred = useSelector((state) => state.boards[boardId].starred);
  const listUS = useSelector((state) => state.lists);
  const cards = lists.reduce((prev, id) => [...prev, ...listUS[id].cards], []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UPDATEBOARD({ boardId, newValues: { accessed: new Date() } }));
  }, [boardId, dispatch]);

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

  const handleStartBoardEdit = () => {
    setIsEditingBoard(true);
    setEditBoardId(boardId);
  };

  const handleSaveBoardEdit = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (boardText) {
        dispatch(UPDATEBOARD({ boardId: editBoardId, newValues: { name: boardText } }));
        setBoardText(null);
        setEditBoardId(null);
        setIsEditingBoard(false);
      } else {
        setBoardText(null);
        setIsEditingBoard(false);
      }
    }
  };

  return (
    <>
      <div className="board d-flex flex-column w-100 h-100 pb-2 px-2">
        {/**
         * Board Header
         */}
        <div className="row mx-0 mb-3 align-items-center text-white">
          {/**
           * board title edit
           */}
          <div className="col-auto ps-0" onClick={handleStartBoardEdit} role="button">
            {isEditingBoard ? (
              <textarea
                placeholder="Enter board title..."
                className={`${styles.board_textarea} form-control h3 ps-0 pt-1`}
                defaultValue={boardText || name}
                onChange={(e) => setBoardText(e.target.value)}
                onKeyPress={handleSaveBoardEdit}
                onBlur={handleSaveBoardEdit}
                maxLength={19}
                autoFocus
              />
            ) : (
              <h2>{name}</h2>
            )}
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
          <div className="col-auto ms-auto pe-0">
            <Link type="button" className="btn" onClick={handleDeleteBoard} to="/trello-app">
              <FontAwesomeIcon icon="fa-solid fa-trash" className="text-trans text-trans-hover" />
            </Link>
          </div>
        </div>

        <ScrollX mods="d-flex flex-row h-100 ">
          {/**
           * for list
           */}
          {lists.map((listId, index) => (
            <ListContainer
              index={index}
              boardId={boardId}
              key={listId}
              mods="col-auto ms-0 me-2 px-0"
            >
              <List boardId={boardId} listId={listId} onDeleteList={handleDeleteList} />
            </ListContainer>
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
                    onChange={(e) => setListName(e.target.value)}
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
                onClick={() => setIsAdding(true)}
              >
                <FontAwesomeIcon icon="plus" className="small" />
                {lists?.length ? ' Add another list' : ' Add a list'}
              </Button>
            )}
          </div>
        </ScrollX>
      </div>
    </>
  );
};

Board.propTypes = propTypes;

export default Board;
