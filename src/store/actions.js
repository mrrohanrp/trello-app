import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  UPDATE_COLOR,
  ADD_RECENT
} from './actionTypes.js';

/**
 * Board Actions
 */
export const CREATEBOARD = (payload) => ({ type: CREATE_BOARD, payload });
export const UPDATEBOARD = (payload) => ({ type: UPDATE_BOARD, payload });
export const DELETEBOARD = (payload) => ({ type: DELETE_BOARD, payload });

/**
 * List Actions
 */
export const CREATELIST = (payload) => ({ type: CREATE_LIST, payload });
export const UPDATELIST = (payload) => ({ type: UPDATE_LIST, payload });
export const DELETELIST = (payload) => ({ type: DELETE_LIST, payload });

/**
 * Card Actions
 */
export const CREATECARD = (payload) => ({ type: CREATE_CARD, payload });
export const UPDATECARD = (payload) => ({ type: UPDATE_CARD, payload });
export const DELETECARD = (payload) => ({ type: DELETE_CARD, payload });

/**
 * UI Actions
 */
export const UPDATECOLOR = (payload) => ({ type: UPDATE_COLOR, payload });
export const ADDRECENT = (payload) => ({ type: ADD_RECENT, payload });
