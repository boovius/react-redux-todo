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
  handleClick,
  completed,
  text
}) => {
  return (
    <li
      onClick={handleClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
      >
      {text}
    </li>
  )
}

const TodosList = ({
  todos,
  handleTodoClick
}) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo key={todo.id}
          {...todo}
          handleClick={() => {handleTodoClick(todo.id)}}
        />
      )}
    </ul>
  )
}

const AddTodo = ({
  processInput
}) => {
  let input;
  return (
    <div>
      <input ref={ node => {
          input = node;
        }}
      />
      <button onClick={() => {
          processInput(input.value);
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterLinkClick
}) => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink filter='SHOW_ALL'
        currentFilter={visibilityFilter}
        onClick={onFilterLinkClick}
        >
        All
      </FilterLink>
      {', '}
      <FilterLink filter='SHOW_COMPLETED'
        currentFilter={visibilityFilter}
        onClick={onFilterLinkClick}
        >
        Completed
      </FilterLink>
      {', '}
      <FilterLink filter='SHOW_ACTIVE'
        currentFilter={visibilityFilter}
        onClick={onFilterLinkClick}
        >
        Active
      </FilterLink>
    </p>
  )
}

const FilterLink = ({
  filter,
  children,
  currentFilter,
  onClick,
}) => {
  if (filter === currentFilter) {
    return <span> {children} </span>;
  }
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick(filter);
       }}
    >
      {children}
    </a>
  )
}

const TodoApp = ({
  todos,
  visibilityFilter
}) => {
  <div>
    <AddTodo
      processInput={text =>
        store.dispatch({
          type: 'ADD_TODO',
          text: text
        })
      }
    />
    <TodosList
      todos={getVisibleTodos(todos, visibilityFilter)}
      handleTodoClick={(id) => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
      })
    }} />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterLinkClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('root')
  )
  console.log(store.getState());
}

store.subscribe(render);
render();

