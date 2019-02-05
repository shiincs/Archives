import { v4 } from 'node-uuid';

// 새로고침 될 때마다 0이 되는 문제로 인해 unique 하지 않다.
// let nextTodoId = 0;

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};
