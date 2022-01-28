import React, { forwardRef } from 'react';

export const CardInput = forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      placeholder="Enter a description for this card..."
      className="form-control growing-text-area"
      autoFocus
      {...props}
    />
  );
});
export default CardInput;
