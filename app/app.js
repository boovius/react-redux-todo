import { createStore } from 'redux';

import { todoApp } from './reducers';

let store = createStore(todoApp);

console.log(store.getState());

store.dispatch({
  type: 'ADD_TODO',
  text: 'learn redux'
});

console.log(store.getState());

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});

console.log(store.getState());


store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'HIDE_COMPLETED'
});

console.log(store.getState());
