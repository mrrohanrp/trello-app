import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const Boards = () => {
  const { boardName } = useParams();
  const colorUS = useSelector((state) => state.modify.color);

  return (
    <div className={`content container-fluid bg-${colorUS} py-4`}>
      <Board board={boardName} />
    </div>
  );
};

export default Boards;
