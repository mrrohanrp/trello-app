import React from 'react';
import List from './List';
import styles from './Board.module.scss';

const Board = () => {
  return (
    <div className={`${styles.board} d-flex flex-column bg-dark`}>
      <div className="container text-center text-light">
        <h2>Trello</h2>
      </div>
      <div className={`${styles.content} container-fluid bg-primary`}>
        <div className="d-flex flex-column">
          <h3>Board</h3>
          <div className="row">
            <div className="col-auto">
              <List board="temp" name="To Do" />
            </div>
            <div className="col-auto">
              <List board="temp" name="Pending" />
            </div>
            <div className="col-auto">
              <List board="temp" name="With no cards" />
            </div>
            <div className="col-auto">
              <List board="temp" name="Done" />
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
