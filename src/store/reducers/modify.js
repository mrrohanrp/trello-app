import { ADD_LIST, ADD_CARD, ADD_BOARD } from '../actionTypes';

const initialState = {
  boards: {
    temp: {
      'To Do': ['Todo 1', 'Todo 2'],
      Pending: ['single card for 2nd title'],
      'With no cards': [],
      Done: []
    }
  }
};

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { board, list, newCard } = action.payload;
      const updatedList = Object.assign({}, state.boards[board][list]);
      updatedList.push(newCard);
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, { [list]: updatedList })
      });
    }
    case ADD_LIST: {
      const { board, list } = action.payload;
      const updatedBoard = Object.assign({}, state.boards[board], { [list]: [] });
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, { [board]: updatedBoard })
      });
    }
    case ADD_BOARD: {
      const { board } = action.payload;
      return Object.assign({}, state, { boards: Object.assign({}, state.boards, { [board]: {} }) });
    }
    default:
      return state;
  }
};

export default addReducer;
