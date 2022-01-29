import React, { forwardRef } from 'react';

export const CardInput = forwardRef((props, ref) => {
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
export default CardInput;
