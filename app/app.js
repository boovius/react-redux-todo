import { createStore } from 'redux';
import { todoApp } from './reducers';
import React from 'react';
import ReactDOM from 'react-dom';

let store = createStore(todoApp);

let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input ref={ node => {
          this.input = node;
        }}/>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          })
          this.input.value = '';
        }}
        >
          Add Todo
        </button>
        <button onClick={() => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: nextTodoId-1
          })
        }}
        >
          Toggle Last
        </button>
        <button onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: 'HIDE_COMPLETED'
          })
        }}>
          Hide Completed
        </button>
        <ul>
          {this.props.todos.map((todo) =>
             <li key={todo.id}>
               {todo.text} - 
               {todo.completed ? 'completed' : 'not'}
             </li>
           )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById('root')
  )
  console.log(store.getState());
}

store.subscribe(render);
render();

