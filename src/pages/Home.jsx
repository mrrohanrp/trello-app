import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardAdd from '../components/BoardAdd';
import BoardsSection from '../components/BoardsSection';
import { UPDATECOLOR } from '../store/actions';

const propTypes = {
  /** Board Name to display board */
  name: PropTypes.string.isRequired,
  /** Board Name to display board */
  index: PropTypes.number.isRequired
};

export const BoardDisplay = ({ name, index }) => {
  const boardNamesUS = useSelector((state) => state.modify.boards);
  const boardNames = Object.keys(boardNamesUS);
  const boardColors = boardNames.map((name) => boardNamesUS[name].color);

  const dispatch = useDispatch();
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 my-2">
      <Link
        to={`board/${name}`}
        role="button"
        className={`btn btn-block text-start h-100 w-100 bg-${boardColors[index]} bg-${boardColors[index]}-hover`}
        onClick={() => dispatch(UPDATECOLOR({ color: boardColors[index] }))}
      >
        <p className="fw-bolder h5 h-100 text-white text-break">{name}</p>
      </Link>
    </div>
  );
};

const Home = () => {
  const boardNamesUS = useSelector((state) => state.modify.boards);
  const boardNames = Object.keys(boardNamesUS);

  const recentBoardNamesUS = useSelector((state) => state.modify.recent);

  return (
    <div className="content container-fluid py-4">
      {/**
       * Boards Section
       */}
      {/* TODO: add starred boards */}
      {/* <BoardsSection title="Starred Boards" icon="star" /> */}

      <BoardsSection title="Recently Viewed" icon="recent">
        {recentBoardNamesUS?.map((name, index) => (
          <BoardDisplay name={name} index={index} key={name} />
        ))}
      </BoardsSection>

      <BoardsSection title="Your Workspace" icon="workspace">
        {boardNames?.map((name, index) => (
          <BoardDisplay name={name} index={index} key={name} />
        ))}
        <BoardAdd />
      </BoardsSection>
    </div>
  );
};

BoardDisplay.propTypes = propTypes;

export default Home;
