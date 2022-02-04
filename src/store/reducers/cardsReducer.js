import { CREATE_CARD, UPDATE_CARD, DELETE_CARD } from '../actionTypes';
import { deleteFromObj, updateObj } from '../../utils/utils';

const initialState = {
  cid1: {
    description: 'Todo 1',
    checked: false
  },
  cid2: {
    description: 'Todo 2',
    checked: false
  },
  cid3: {
    description: 'Todo 3',
    checked: false
  },
  cid4: {
    description: 'Pending 1',
    checked: false
  },
  cid5: {
    description: 'Pending 2',
    checked: false
  },
  cid6: {
    description: 'Done 1',
    checked: false
  },
  cid7: {
    description: 'Designate 1',
    checked: false
  }
};

function createCard(state, action) {
  const { cardId, description } = action.payload;
  const newCard = { description, checked: false };
  return updateObj(state, { [cardId]: newCard });
}

function updateCard(state, action) {
  const { cardId, newValues } = action.payload;
  const updatedCard = updateObj(state[cardId], newValues);
  return updateObj(state, { [cardId]: updatedCard });
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARD:
      return createCard(state, action);
    case UPDATE_CARD:
      return updateCard(state, action);
    case DELETE_CARD:
      return deleteFromObj(state, action.payload.cardId);
    default:
      return state;
  }
};

export default cardsReducer;
