import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardAdd from '../components/BoardAdd';
import BoardsSection from '../components/BoardsSection';
import { UPDATECOLOR } from '../store/actions';

const propTypes = {
  /** Board ID to display board */
  boardId: PropTypes.string.isRequired
};

export const BoardDisplay = ({ boardId }) => {
  const name = useSelector((state) => state.boards[boardId].name);
  const color = useSelector((state) => state.boards[boardId].color);

  const dispatch = useDispatch();
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 my-2">
      <Link
        to={`board/${boardId}/${name}`}
        role="button"
        className={`btn btn-block text-start h-100 w-100 bg-${color} bg-${color}-hover`}
        onClick={() => dispatch(UPDATECOLOR({ color }))}
      >
        <p className="fw-bolder h5 h-100 text-white text-break">{name}</p>
      </Link>
    </div>
  );
};

const Home = () => {
  const boardsUS = useSelector((state) => state.boards);
  const boards = Object.keys(boardsUS);

  const recent = useSelector((state) => state.ui.recent);

  return (
    <div className="content container-fluid py-4">
      {/**
       * Boards Section
       */}
      {/* TODO: add starred boards */}
      {/* <BoardsSection title="Starred Boards" icon="star" /> */}

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
