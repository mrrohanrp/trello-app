import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  CREATE_CARD,
  DELETE_CARD,
  DELETE_BOARD,
  ADD_CARD,
  MOVE_CARD,
  REMOVE_CARD
} from '../actionTypes';
import { deleteFromObj, updateObj } from '../../utils/utils';

const initialState = {
  lid1: {
    name: 'To Do',
    cards: ['cid1', 'cid2', 'cid3']
  },
  lid2: {
    name: 'Pending',
    cards: ['cid4', 'cid5']
  },
  lid3: {
    name: 'Done',
    cards: ['cid6']
  },
  lid4: {
    name: 'Designate',
    cards: ['cid7']
  },
  lid5: {
    name: 'Testing',
    cards: []
  }
};

function createList(state, action) {
  const { listId, name } = action.payload;
  const newList = { name, cards: [] };
  return updateObj(state, { [listId]: newList });
}

function updateList(state, action) {
  const { listId, newValues } = action.payload;
  const updatedList = updateObj(state[listId], newValues);
  return updateObj(state, { [listId]: updatedList });
}

function createCard(state, action) {
  const { listId, cardId } = action.payload;
  const newCards = [...state[listId].cards.slice(), cardId];
  const updatedList = updateObj(state[listId], { cards: newCards });
  return updateObj(state, { [listId]: updatedList });
}

function deleteCard(state, action) {
  const { listId, cardId } = action.payload;
  const newCards = state[listId].cards.slice().filter((id) => id !== cardId);
  const updatedList = updateObj(state[listId], { cards: newCards });
  return updateObj(state, { [listId]: updatedList });
}

function addCardAtIndex(state, action) {
  const { index, listId, cardId } = action.payload;
  const newCards = state[listId].cards.slice();
  newCards.splice(index, 0, cardId);
  const updatedList = updateObj(state[listId], { cards: newCards });
  return updateObj(state, { [listId]: updatedList });
}

function moveCard(state, action) {
  const { index, listId, cardId } = action.payload;
  const initialIndex = state[listId].cards.indexOf(cardId);
  const finalIndex = index > initialIndex ? index - 1 : index;
  const newCards = state[listId].cards.filter((id) => id !== cardId);
  newCards.splice(finalIndex, 0, cardId);
  const updatedList = updateObj(state[listId], { cards: newCards });
  return updateObj(state, { [listId]: updatedList });
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIST:
      return createList(state, action);
    case UPDATE_LIST:
      return updateList(state, action);
    case DELETE_LIST:
      return deleteFromObj(state, action.payload.listId);
    case CREATE_CARD:
      return createCard(state, action);
    case REMOVE_CARD:
    case DELETE_CARD:
      return deleteCard(state, action);
    case DELETE_BOARD:
      return deleteFromObj(state, action.payload.listIds);
    case ADD_CARD:
      return addCardAtIndex(state, action);
    case MOVE_CARD:
      return moveCard(state, action);
    default:
      return state;
  }
};

export default listsReducer;
