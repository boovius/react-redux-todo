import { createStore } from 'redux';
import { todoApp } from './reducers';
import React from 'react';
import ReactDOM from 'react-dom';

let store = createStore(todoApp);

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

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    >
    {text}
  </li>
)

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

class VisibleTodos extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
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

const AddTodo = () => {
  let input;
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

const Link = ({
  active,
  onClick,
  children
}) => {
  if (active) {
    return <span> {children} </span>;
  }
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
    </a>
  )
}

class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children } = this.props;
    const state = store.getState();

    return (
      <Link
        active={
          filter === state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      >
        {children}
      </Link>
    )
  }
}

const Footer = ({
  onFilterLinkClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
  </p>
)

const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo />
    <VisibleTodos />
    <Footer />
  </div>
)

ReactDOM.render(
  <TodoApp {...store.getState()}/>,
  document.getElementById('root')
)

