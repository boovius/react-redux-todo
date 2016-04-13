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
  }
}

const todos  = (state = [], action) => {
  switch(action.type) {
    case('ADD_TODO'):
      return [
        ...state,
        todo({id: state.length}, action)
      ]
    case('TOGGLE_TODO'):
      return [
        ...state.slice(0, action.id),
        todo(state[action.id], action),
        ...state.slice([action.id+1])
      ]
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

export default function todoApp (state = {}, action) {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}
