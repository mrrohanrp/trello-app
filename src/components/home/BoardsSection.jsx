import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className="boards-section d-flex flex-column mx-xl-5 mx-lg-4 mx-md-3 mx-0 mb-4">
        <div className="row mx-0 mb-0">
          <div className="col-auto px-0 align-self-end">
            <FontAwesomeIcon icon={icon} className="me-3 h3" />
          </div>
          <div className="col-auto px-0">
            <h3>{title}</h3>
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
