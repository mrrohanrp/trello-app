import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** onChange handler for Card Input */
  onChange: PropTypes.func,
  /** onKeyPress handler for Card Input */
  onKeyPress: PropTypes.func,
  /** onBlur handler for Card Input */
  onBlur: PropTypes.func
};

const CardInput = forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      placeholder="Enter a title for this card..."
      className="form-control"
      autoFocus
      {...props}
    />
  );
});

CardInput.propTypes = propTypes;

export default CardInput;
