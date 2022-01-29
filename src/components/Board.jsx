import React, { useRef, useState } from 'react';
import List from './List';
import styles from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ADDLIST } from '../store/actions';

const Board = ({ board }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newList, setNewList] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const listsUS = useSelector((state) => state.modify.boards[board]);
  const listNames = Object.keys(listsUS);

  const dispatch = useDispatch();

  const handleAddList = () => {
    setIsAdding(true);
  };

  const handleChange = (e) => {
    setNewList(e.target.value);
  };

  const handleSaveList = (e) => {
    if (!e.key || e.key === 'Enter') {
      if (newList) {
        dispatch(ADDLIST({ board, newList }));
        setNewList(null);
        inputRef.current.value = null;
        setIsAdding(false);
      }
      // no new line after enter
      e.preventDefault();
    }
  };

  const handleCancelList = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === 'add-list-btn') {
      inputRef.current.focus();
    } else {
      setIsAdding(false);
      setNewList(null);
    }
  };

  return (
    <div className={`${styles.board} d-flex flex-column bg-dark`}>
      <div className="container text-center text-light">
        <h2>Trello</h2>
      </div>
      <div className={`${styles.content} container-fluid bg-primary`}>
        <div className="d-flex flex-column">
          <h3>{board} Board</h3>

          {/**
           * for list
           */}
          <div className="row">
            {listNames.map((listName) => (
              <div className="col-auto" key={listName}>
                <List board={board} title={listName} cards={listsUS[listName]} />
              </div>
            ))}

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
                      <button
                        id="add-list-btn"
                        ref={btnRef}
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveList}
                      >
                        Add List
                      </button>
                      <button
                        type="button"
                        className="btn-close btn mx-2"
                        aria-label="close"
                        onClick={handleCancelList}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className={`${styles.board_list_add} btn btn-dark text-left`}
                  onClick={handleAddList}
                >
                  {listNames?.length ? '+ Add another list' : '+ Add a list'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="container text-light">
        <div className="row justify-content-end text-center">
          <h4>Footer</h4>
        </div>
      </footer>
    </div>
  );
};

export default Board;
