import { combineReducers } from 'redux';
import { todos } from './todos';


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

export const todoApp = combineReducers({todos, visibilityFilter});
