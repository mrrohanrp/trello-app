import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardAdd from '../components/BoardAdd';
import BoardsSection from '../components/BoardsSection';
import { UPDATEBOARD, UPDATECOLOR } from '../store/actions';

const propTypes = {
  /** Board ID to display board */
  boardId: PropTypes.string.isRequired
};

export const BoardDisplay = ({ boardId }) => {
  const name = useSelector((state) => state.boards[boardId].name);
  const color = useSelector((state) => state.boards[boardId].color);
  const starred = useSelector((state) => state.boards[boardId].starred);

  const dispatch = useDispatch();
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 my-2">
      <Link
        to={`board/${boardId}/${name}`}
        role="button"
        className={`btn btn-block text-start h-100 w-100 bg-${color} bg-${color}-hover`}
        onClick={() => dispatch(UPDATECOLOR({ color }))}
      >
        <div className="container h-100 px-0">
          <div className="row mx-0 h-75">
            <p className="board-display-title fw-bolder h5 h-100 text-white text-break">{name}</p>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn p-0 board-display-star"
              onClick={(e) => {
                dispatch(UPDATEBOARD({ boardId, newValues: { starred: !starred } }));
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {starred ? '🌟' : '⭐'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const boardsUS = useSelector((state) => state.boards);
  const boards = Object.keys(boardsUS);
  const starred = boards.filter((id) => boardsUS[id].starred);
  const recent = boards
    .filter((id) => !starred.includes(id) && boardsUS[id].accessed)
    .sort((a, b) => boardsUS[b].accessed - boardsUS[a].accessed)
    .slice(0, 4);

  return (
    <div className="content container-fluid py-4">
      {/**
       * Boards Section
       */}
      <BoardsSection title="Starred Boards" icon="star">
        {starred.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Recently Viewed" icon="recent">
        {recent?.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Your Workspace" icon="workspace">
        {boards?.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
        <BoardAdd />
      </BoardsSection>
    </div>
  );
};

BoardDisplay.propTypes = propTypes;

export default Home;
