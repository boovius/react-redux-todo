//react
import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//reducers
import { todoApp } from './reducers';

//components
import AddTodo from './components/containers/add_todo';
import VisibleTodos from './components/containers/visible_todos';
import Footer from './components/presenters/footer';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodos />
    <Footer />
  </div>
)

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

