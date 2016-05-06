import React from 'react';
import Todo from './todo';

const TodosList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id}
        {...todo}
        onClick={() => {onTodoClick(todo.id)}}
      />
    )}
  </ul>
)

export default TodosList;
