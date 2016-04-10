import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { todos } from '../app/reducers/index';

describe('todos', () => {

  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  it('adds a todo and does not mutate original state', () => {
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
