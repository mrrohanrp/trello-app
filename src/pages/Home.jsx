import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardAdd from '../components/BoardAdd';
import BoardsSection from '../components/BoardsSection';
import { UPDATEBOARD, UPDATEUI } from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Home.module.scss';

const propTypes = {
  /** Board ID to display board */
  boardId: PropTypes.string.isRequired
};

export const BoardDisplay = ({ boardId }) => {
  const name = useSelector((state) => state.boards[boardId].name);
  const color = useSelector((state) => state.boards[boardId].color);
  const img = useSelector((state) => state.boards[boardId].img);
  const starred = useSelector((state) => state.boards[boardId].starred);

  const dispatch = useDispatch();
  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2" style={{ height: '6rem' }}>
      <Link
        to={`board/${boardId}/${name}`}
        role="button"
        className={`btn btn-block text-start h-100 w-100  ${
          img ? `bg-img-small-${img} position-relative` : `bg-${color} bg-${color}-hover`
        }`}
        onClick={() => {
          dispatch(UPDATEUI({ color, img }));
        }}
      >
        <div
          className={`container h-100 px-0 ${styles.board_tile} ${
            img ? ` bg-img-small-${img}-hover` : ''
          }`}
        >
          <div className="row mx-0 h-75">
            <p className="board-display-title fw-bolder h5 h-100 text-white text-break">{name}</p>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className={`btn p-0 ${starred ? 'opacity-100 me-2' : styles.board_star_icon}`}
              onClick={(e) => {
                dispatch(UPDATEBOARD({ boardId, newValues: { starred: !starred } }));
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{ zIndex: '1000' }}
            >
              <FontAwesomeIcon
                icon={starred ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                className={`hover-transform ${starred ? 'text-warning' : 'text-white'}`}
                title="Click to star this board. It will be added to your starred list."
              />
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
    <div className="content container-fluid py-4 bg-white">
      {/**
       * Boards Section
       */}
      <BoardsSection title="Starred Boards" icon="fa-regular fa-star">
        {starred.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Recently Viewed" icon="fa-regular fa-clock">
        {recent?.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Your Workspace" icon="fa-brands fa-trello">
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
