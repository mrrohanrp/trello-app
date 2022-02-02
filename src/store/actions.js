import {
  ADD_CARD,
  MODIFY_CARD,
  REMOVE_CARD,
  ADD_LIST,
  RENAME_LIST,
  REMOVE_LIST,
  ADD_BOARD,
  RENAME_BOARD,
  REMOVE_BOARD,
  UPDATE_COLOR,
  ADD_RECENT
} from './actionTypes.js';

export const ADDCARD = (payload) => ({ type: ADD_CARD, payload });
export const MODIFYCARD = (payload) => ({ type: MODIFY_CARD, payload });
export const REMOVECARD = (payload) => ({ type: REMOVE_CARD, payload });
export const ADDLIST = (payload) => ({ type: ADD_LIST, payload });
export const RENAMELIST = (payload) => ({ type: RENAME_LIST, payload });
export const REMOVELIST = (payload) => ({ type: REMOVE_LIST, payload });
export const ADDBOARD = (payload) => ({ type: ADD_BOARD, payload });
export const RENAMEBOARD = (payload) => ({ type: RENAME_BOARD, payload });
export const REMOVEBOARD = (payload) => ({ type: REMOVE_BOARD, payload });
export const UPDATECOLOR = (payload) => ({ type: UPDATE_COLOR, payload });
export const ADDRECENT = (payload) => ({ type: ADD_RECENT, payload });
