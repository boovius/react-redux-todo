import { createStore } from 'redux';
import { todoApp } from './reducers';
import React from 'react';
import ReactDOM from 'react-dom';
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

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: React.PropTypes.object
}

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

