import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import styles from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ADDLIST, ADDRECENT } from '../store/actions';

const propTypes = {
  /** Board Name for board */
  board: PropTypes.string.isRequired
};

const Board = ({ board }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newList, setNewList] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const listsUS = useSelector((state) => state.modify.boards[board].lists);
  const colorUS = useSelector((state) => state.modify.color);
  const listNames = listsUS ? Object.keys(listsUS) : null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ADDRECENT({ board }));
  }, [board, dispatch]);

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
    <>
      {listsUS ? (
        <div className="d-flex flex-column w-100 h-100 pb-4">
          <h3>{board}</h3>
          <div className="d-flex flex-row h-100 flex-wrap">
            {/**
             * for list
             */}
            {listNames.map((listName) => (
              <div className="col-auto ms-0 me-2 px-0" key={listName}>
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
                  className={`${styles.board_list_add} btn text-start text-white bg-light-${colorUS} bg-${colorUS}-hover`}
                  onClick={handleAddList}
                >
                  {listNames?.length ? '+ Add another list' : '+ Add a list'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /**
         * show if board not found
         */
        <div className="row justify-content-center text-center">
          <div className="d-flex flex-column">
            <h1 className="text-danger fw-bold">Error</h1>
            <h5>{`The requested board "${board}" does not exist...`}</h5>
          </div>
        </div>
      )}
    </>
  );
};

Board.propTypes = propTypes;

export default Board;
