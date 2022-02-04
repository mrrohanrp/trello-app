import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const Boards = () => {
  const { bid } = useParams();

  const colorUS = useSelector((state) => state.ui.color);

  return (
    <div className={`content container-fluid bg-${colorUS} py-4`}>
      <Board boardId={bid} />
    </div>
  );
};

export default Boards;
