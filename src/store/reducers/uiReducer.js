import { updateObj } from '../../utils/utils';
import { UPDATE_COLOR, ADD_RECENT } from '../actionTypes';

const initialState = {
  color: 'blue',
  recent: []
};

function addRecent(state, action) {
  const { boardId } = action.payload;
  const recent = state.recent.includes(boardId)
    ? [boardId, ...state.recent.slice().filter((k) => k !== boardId)]
    : [boardId, ...state.recent.slice()];
  if (recent.length > 4) recent.pop();
  return updateObj(state, { recent });
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return updateObj(state, { color: action.payload.color });
    case ADD_RECENT:
      return addRecent(state, action);
    default:
      return state;
  }
};

export default uiReducer;
