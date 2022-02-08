import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

import logger from 'redux-logger';
import { readState, debouncedSaveState } from './localStorage';

const store = createStore(rootReducer, readState(), applyMiddleware(logger));

store.subscribe(() => {
  const state = store.getState();
  debouncedSaveState(state);
});

export default store;
