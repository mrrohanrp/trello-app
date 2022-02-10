import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';
import NotFoundPage from './NotFoundPage';
import DragLayer from '../components/ui/DragLayer';

const BoardsPage = () => {
  const { bid } = useParams();

  const isBoardExist = !!useSelector((state) => state.boards[bid]);

  return isBoardExist ? (
    <div className={`content boardsPage container-fluid mt-4`}>
      <Board boardId={bid} />
      <DragLayer />
    </div>
  ) : (
    /**
     * show if board not found
     */
    <NotFoundPage message={`Board "${bid}"`} />
  );
};

export default BoardsPage;
