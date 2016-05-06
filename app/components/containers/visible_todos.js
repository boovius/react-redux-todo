import React from 'react';
import TodosList from '../presenters/todos_list';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

export default class VisibleTodos extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { todos, visibilityFilter } = store.getState();
    return (
      <TodosList
        todos={
          getVisibleTodos(todos, visibilityFilter)
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}

VisibleTodos.contextTypes = {
  store: React.PropTypes.object
};
