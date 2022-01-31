import React from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const Boards = () => {
  const { boardName } = useParams();

  return (
    <>
      <div className="content container-fluid bg-primary py-4">
        <Board board={boardName} />
      </div>
    </>
  );
};

export default Boards;
