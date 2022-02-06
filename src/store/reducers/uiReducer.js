import { updateObj } from '../../utils/utils';
import { UPDATE_COLOR } from '../actionTypes';

const initialState = {
  color: 'blue',
  recent: []
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return updateObj(state, { color: action.payload.color });
    default:
      return state;
  }
};

export default uiReducer;
