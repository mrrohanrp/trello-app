import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATEUI } from '../store/actions';
import { useParams } from 'react-router-dom';

import Board from '../components/Board';
import NotFoundPage from './NotFoundPage';
import DragLayer from '../components/ui/DragLayer';

const BoardsPage = () => {
  const { bid } = useParams();

  const board = useSelector((state) => state.boards[bid]);
  const isBoardExist = !!board;
  const { color = null, img = null } = isBoardExist && board;

  const dispatch = useDispatch();

  useEffect(() => {
    isBoardExist && dispatch(UPDATEUI({ color, img }));
  }, [color, img, dispatch, isBoardExist]);

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
