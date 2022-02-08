import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  DELETE_LIST,
  ADD_LIST,
  MOVE_LIST,
  REMOVE_LIST
} from '../actionTypes';
import { deleteFromObj, updateObj } from '../../utils/utils';

const initialState = {
  bid1: {
    name: 'Earth',
    color: null,
    img: 'earth',
    lists: ['lid1', 'lid2', 'lid3'],
    starred: true,
    accessed: null
  },
  bid2: {
    name: 'Beach',
    color: null,
    img: 'beach',
    lists: ['lid4', 'lid5'],
    starred: false,
    accessed: null
  },
  bid3: {
    name: 'Vase',
    color: null,
    img: 'vase',
    lists: [],
    starred: false,
    accessed: null
  },
  bid4: {
    name: 'Forest',
    color: null,
    img: 'forest',
    lists: [],
    starred: true,
    accessed: null
  },
  bid5: {
    name: 'Balloon',
    color: null,
    img: 'balloon',
    lists: [],
    starred: true,
    accessed: null
  },
  bid6: {
    name: 'Sunset',
    color: null,
    img: 'sunset',
    lists: [],
    starred: false,
    accessed: null
  },
  bid7: {
    name: 'Board Blue',
    color: 'blue',
    img: null,
    lists: [],
    starred: false,
    accessed: null
  },
  bid8: {
    name: 'Board Orange',
    color: 'orange',
    img: null,
    lists: [],
    starred: false,
    accessed: null
  },
  bid9: {
    name: 'Board Pink',
    color: 'pink',
    img: null,
    lists: [],
    starred: false,
    accessed: null
  },
  bid10: {
    name: 'Board Mint',
    color: 'mint',
    img: null,
    lists: [],
    starred: false,
    accessed: null
  },
  bid11: {
    name: 'Board Sky',
    color: 'sky',
    img: null,
    lists: [],
    starred: false,
    accessed: null
  }
};

function createBoard(state, action) {
  const { boardId, name, color, img } = action.payload;
  const newBoard = {
    name,
    color,
    img,
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

function addListAtIndex(state, action) {
  const { index, boardId, listId } = action.payload;
  const newLists = state[boardId].lists.slice();
  newLists.splice(index, 0, listId);
  const updatedList = updateObj(state[boardId], { lists: newLists });
  return updateObj(state, { [boardId]: updatedList });
}

function moveList(state, action) {
  const { index, boardId, listId } = action.payload;
  const initialIndex = state[boardId].lists.indexOf(listId);
  const finalIndex = index > initialIndex ? index - 1 : index;
  const newLists = state[boardId].lists.filter((id) => id !== listId);
  newLists.splice(finalIndex, 0, listId);
  const updatedList = updateObj(state[boardId], { lists: newLists });
  return updateObj(state, { [boardId]: updatedList });
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
    case REMOVE_LIST:
    case DELETE_LIST:
      return deleteList(state, action);
    case ADD_LIST:
      return addListAtIndex(state, action);
    case MOVE_LIST:
      return moveList(state, action);
    default:
      return state;
  }
};

export default boardsReducer;
