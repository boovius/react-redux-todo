import React from 'react';

const AddTodo = (
  props, context
) => {
  let input;
  let store = context.store;

  return (
    <div>
      <input ref={ node => {
          input = node;
        }}
      />
      <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: input.value
          });
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

AddTodo.contextTypes = {
  store: React.PropTypes.object
}

export default AddTodo;
