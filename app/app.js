import { createStore } from 'redux';
import { todos } from './reducers';
import React from 'react';
import ReactDOM from 'react-dom';

let store = createStore(todos);

let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          })
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
    <TodoApp todos={store.getState()}/>,
    document.getElementById('root')
  )
  console.log(store.getState());
}

store.subscribe(render);
render();

