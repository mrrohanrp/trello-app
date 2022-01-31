import React from 'react';
import { Link } from 'react-router-dom';

const boardNames = ['temp', 'primary', 'default'];

const Home = () => {
  return (
    <div className="content container-fluid py-4">
      <div className="row mx-lg-3 mx-0 board-display-container">
        {boardNames.map((name) => (
          <div className="col-lg-3 col-md-4 col-sm-6 my-2" key={name}>
            <Link to={`board/${name}`}>
              <div className="container h-100 px-0">
                <div className="row mx-0">
                  <button
                    type="button"
                    className="btn btn-block btn-primary mb-4 board-display p-5"
                  >
                    {name}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
