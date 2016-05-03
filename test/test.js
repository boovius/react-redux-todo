import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { todos } from '../app/reducers/index';

describe('todos', () => {
  describe('ADD_TODO', () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_TODO',
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

  describe('TOGGLE_TODO', () => {
    describe('given valid id of todo', () => {
      const stateBefore = [
        {
          id: 0,
          text: 'Learn Relay',
          completed: false
        },
        {
          id: 1,
          text: 'Learn Redux',
          completed: false
        },
        {
          id: 2,
          text: 'Learn Velocity',
          completed: false
        }
      ];
      const action = {
        type: 'TOGGLE_TODO',
        id: 1,
      };

      const stateAfter = [
        {
          id: 0,
          text: 'Learn Relay',
          completed: false
        },
        {
          id: 1,
          text: 'Learn Redux',
          completed: true
        },
        {
          id: 2,
          text: 'Learn Velocity',
          completed: false
        }
      ];

      deepFreeze(stateBefore);
      deepFreeze(action);

      it('toggles the completed field on the todo', () => {
        expect(todos(stateBefore, action)).toEqual(stateAfter);
      });
    });

    describe('invalid todo id', () => {
      const stateBefore = [
        {
          id: 0,
          text: 'Learn Relay',
          completed: false
        },
      ];
      const action = {
        type: 'TOGGLE_TODO',
        id: 1,
      };

      const stateAfter = [
        {
          id: 0,
          text: 'Learn Relay',
          completed: false
        },
      ];

      deepFreeze(stateBefore);
      deepFreeze(action);

      it('state does not change', () => {
        expect(todos(stateBefore, action)).toEqual(stateAfter);
      });
    });
  });
});
