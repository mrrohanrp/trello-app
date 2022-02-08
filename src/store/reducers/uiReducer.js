import { updateObj } from '../../utils/utils';
import { UPDATE_COLOR, UPDATE_UI } from '../actionTypes';

const initialState = {
  color: 'blue',
  img: null
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return updateObj(state, { color: action.payload.color });
    case UPDATE_UI:
      return updateObj(state, {
        color: action.payload.color,
        img: action.payload.img
      });
    default:
      return state;
  }
};

export default uiReducer;
