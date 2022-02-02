import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardAdd from '../components/BoardAdd';
import { UPDATECOLOR } from '../store/actions';

const Home = () => {
  const boardNamesUS = useSelector((state) => state.modify.boards);
  const boardNames = Object.keys(boardNamesUS);
  const boardColors = boardNames.map((name) => boardNamesUS[name].color);

  const dispatch = useDispatch();

  return (
    <div className="content container-fluid py-4">
      <div className="row mx-lg-3 mx-0">
        {/**
         * display multiple boards
         */}
        {boardNames &&
          boardNames.map((name, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 my-2" key={name}>
              <Link
                to={`board/${name}`}
                role="button"
                className={`btn btn-block mb-4 p-5 h-100 w-100 bg-${boardColors[index]} bg-${boardColors[index]}-hover`}
                onClick={() => dispatch(UPDATECOLOR({ color: boardColors[index] }))}
              >
                <p className="fw-bolder h5 text-center h-100 text-white text-break">{name}</p>
              </Link>
            </div>
          ))}

        {/**
         * modal to add board
         */}
        <BoardAdd />
      </div>
    </div>
  );
};

export default Home;
