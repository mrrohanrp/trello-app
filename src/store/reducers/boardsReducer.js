import { CREATE_BOARD, UPDATE_BOARD, DELETE_BOARD, CREATE_LIST, DELETE_LIST } from '../actionTypes';
import { deleteFromObj, updateObj } from '../../utils/utils';

const initialState = {
  bid1: {
    name: 'Default',
    color: 'blue',
    lists: ['lid1', 'lid2', 'lid3'],
    starred: false,
    accessed: null
  },
  bid2: {
    name: 'Board Orange',
    color: 'orange',
    lists: ['lid4', 'lid5'],
    starred: false,
    accessed: null
  },
  bid3: {
    name: 'Board Pink',
    color: 'pink',
    lists: [],
    starred: false,
    accessed: null
  },
  bid4: {
    name: 'Board Mint',
    color: 'mint',
    lists: [],
    starred: false,
    accessed: null
  },
  bid5: {
    name: 'Board Sky',
    color: 'sky',
    lists: [],
    starred: false,
    accessed: null
  }
};

function createBoard(state, action) {
  const { boardId, name, color } = action.payload;
  const newBoard = {
    name,
    color,
    starred: false,
    lists: [],
    accessed: null
  };
  return updateObj(state, { [boardId]: newBoard });
}

function updateBoard(state, action) {
  const { boardId, newValues } = action.payload;
  const updatedBoard = updateObj(state[boardId], newValues);
  return updateObj(state, { [boardId]: updatedBoard });
}

function createList(state, action) {
  const { boardId, listId } = action.payload;
  const newLists = [...state[boardId].lists.slice(), listId];
  const updatedBoard = updateObj(state[boardId], { lists: newLists });
  return updateObj(state, { [boardId]: updatedBoard });
}

function deleteList(state, action) {
  const { boardId, listId } = action.payload;
  const newLists = state[boardId].lists.slice().filter((id) => id !== listId);
  const updatedBoard = updateObj(state[boardId], { lists: newLists });
  return updateObj(state, { [boardId]: updatedBoard });
}

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return createBoard(state, action);
    case UPDATE_BOARD:
      return updateBoard(state, action);
    case DELETE_BOARD:
      return deleteFromObj(state, action.payload.boardId);
    case CREATE_LIST:
      return createList(state, action);
    case DELETE_LIST:
      return deleteList(state, action);
    default:
      return state;
  }
};

export default boardsReducer;
