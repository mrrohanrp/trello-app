import React from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';
import DragLayer from '../components/ui/DragLayer';

const BoardsPage = () => {
  const { bid } = useParams();

  return (
    <div className={`content container-fluid mt-4`}>
      <Board boardId={bid} />
      <DragLayer />
    </div>
  );
};

export default BoardsPage;
