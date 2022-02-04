import { combineReducers } from 'redux';
import boardsReducer from './boardsReducer';
import cardsReducer from './cardsReducer';
import listsReducer from './listsReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  ui: uiReducer
});

export default rootReducer;
