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

export function todos (state = [], action) {
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


