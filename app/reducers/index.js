import { combineReducers } from 'redux';

const todo = (state = {}, action) => {
  switch(action.type) {
    case('ADD_TODO'):
      return {
        ...state,
        text: action.text,
        completed: false
      }
    case('TOGGLE_TODO'):
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

export const todos  = (state = [], action) => {
  switch(action.type) {
    case('ADD_TODO'):
      return [
        ...state,
        todo({id: state.length}, action)
      ]
    case('TOGGLE_TODO'):
      return state.map((item) => {
        if (item.id !== action.id) {
          return item;
        } else {
          return todo(item, action);
        }
      })
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

//export const todoApp = combineReducers({todos, visibilityFilter});
