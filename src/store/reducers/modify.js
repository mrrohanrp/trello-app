import { ADD_LIST, ADD_CARD, ADD_BOARD } from '../actionTypes';

const initialState = {
  boards: {
    temp: {
      color: 'blue',
      lists: {
        'To Do': ['Todo 1', 'Todo 2'],
        Pending: ['single card for 2nd title'],
        'With no cards': [],
        Done: []
      }
    }
  }
};

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { board, list, newCard } = action.payload;
      const updatedList = [...state.boards[board].lists[list]];
      updatedList.push(newCard);
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, {
          [board]: Object.assign({}, state.boards[board], {
            lists: Object.assign({}, state.boards[board].lists, {
              [list]: updatedList
            })
          })
        })
      });
    }
    case ADD_LIST: {
      const { board, newList } = action.payload;
      const updatedBoard = Object.assign({}, state.boards[board], {
        lists: Object.assign({}, state.boards[board].lists, { [newList]: [] })
      });
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, { [board]: updatedBoard })
      });
    }
    case ADD_BOARD: {
      const { board, color } = action.payload;
      const newBoard = { [board]: { color, lists: {} } };
      return Object.assign({}, state, { boards: Object.assign({}, state.boards, newBoard) });
    }
    default:
      return state;
  }
};

export default addReducer;
