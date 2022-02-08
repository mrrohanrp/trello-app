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
  ADD_CARD,
  MOVE_CARD,
  REMOVE_CARD,
  ADD_LIST,
  REMOVE_LIST,
  MOVE_LIST,
  UPDATE_UI
} from './actionTypes.js';

/**
 * Board Actions
 */
export const CREATEBOARD = (payload) => ({ type: CREATE_BOARD, payload });
export const UPDATEBOARD = (payload) => ({ type: UPDATE_BOARD, payload });
export const DELETEBOARD = (payload) => ({ type: DELETE_BOARD, payload });
export const ADDLIST = (payload) => ({ type: ADD_LIST, payload });
export const REMOVELIST = (payload) => ({ type: REMOVE_LIST, payload });
export const MOVELIST = (payload) => ({ type: MOVE_LIST, payload });

/**
 * List Actions
 */
export const CREATELIST = (payload) => ({ type: CREATE_LIST, payload });
export const UPDATELIST = (payload) => ({ type: UPDATE_LIST, payload });
export const DELETELIST = (payload) => ({ type: DELETE_LIST, payload });
export const ADDCARD = (payload) => ({ type: ADD_CARD, payload });
export const REMOVECARD = (payload) => ({ type: REMOVE_CARD, payload });
export const MOVECARD = (payload) => ({ type: MOVE_CARD, payload });

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
export const UPDATEUI = (payload) => ({ type: UPDATE_UI, payload });
