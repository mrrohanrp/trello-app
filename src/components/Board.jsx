import React, { useState } from 'react';
import List from './List';
import styles from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ADDLIST } from '../store/actions';

const Board = ({ board }) => {
  const [isAdding, setIsAdding] = useState(false);

  const listsUS = useSelector((state) => state.modify.boards[board]);
  const listNames = Object.keys(listsUS);

  /* const dispatch = useDispatch();
  dispatch(ADDLIST(board, listsUS)); */

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
            <div className="col-auto">
              <div className="card list">{isAdding ? 'ADDING!' : 'NOT ADDING'}</div>
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
