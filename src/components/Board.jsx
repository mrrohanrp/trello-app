import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import styles from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CREATELIST, ADDRECENT } from '../store/actions';
import { Button } from 'react-bootstrap';
import { getNewId } from '../utils/utils';

const propTypes = {
  /** Board ID for board */
  boardId: PropTypes.string.isRequired
};

const Board = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const lists = useSelector((state) => state.boards[boardId].lists);
  const name = useSelector((state) => state.boards[boardId].name);
  const color = useSelector((state) => state.ui.color);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ADDRECENT({ boardId }));
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
      // no new line after enter
      e.preventDefault();
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

  return (
    <>
      {lists ? (
        <div className="d-flex flex-column w-100 h-100 pb-4">
          <h3>{name}</h3>
          <div className="d-flex flex-row h-100 flex-wrap">
            {/**
             * for list
             */}
            {lists.map((listId) => (
              <div className="col-auto ms-0 me-2 px-0" key={listId}>
                {<List listId={listId} />}
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
                      <Button
                        id="add-list-btn"
                        ref={btnRef}
                        variant="primary"
                        onClick={handleSaveList}
                      >
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
                  className={`${styles.board_list_add} text-start text-white bg-light-${color} bg-${color}-hover`}
                  onClick={handleAddList}
                >
                  {lists?.length ? '+ Add another list' : '+ Add a list'}
                </Button>
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
            <h5>{`The requested board "${name}" does not exist...`}</h5>
          </div>
        </div>
      )}
    </>
  );
};

Board.propTypes = propTypes;

export default Board;
