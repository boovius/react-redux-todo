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
        <ul>
          {this.props.todos}.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )
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
}

store.subscribe(render);
render();

