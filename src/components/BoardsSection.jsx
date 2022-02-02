import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Title for Board Section */
  title: PropTypes.string.isRequired,
  /** Icon for Board Section */
  icon: PropTypes.string.isRequired,
  /** Board array for Board Section */
  children: PropTypes.arrayOf(PropTypes.any).isRequired
};

const BoardsSection = ({ children, title, icon }) => {
  if (children?.length) {
    return (
      <div className="d-flex flex-column mx-lg-3 mx-0 mb-5">
        <div className="row mx-0 mb-2">
          <div className="col-auto px-0">
            <span className="me-2 h2">
              {icon === 'star' ? '⭐' : icon === 'recent' ? '🕔' : '🤵'}
            </span>
          </div>
          <div className="col-auto px-0">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="row">{children}</div>
      </div>
    );
  }
  return null;
};

BoardsSection.propTypes = propTypes;

export default BoardsSection;
