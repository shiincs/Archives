import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

import { toggleTodo } from '../actions';
import { withRouter } from 'react-router-dom';

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => ({
  todos: getVisibleTodos(state.todos, filter || 'all'),
});

// const mapDispatchToProps = dispatch => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

const VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    // mapDispatchToProps
    { onTodoClick: toggleTodo }
  )(TodoList)
);

export default VisibleTodoList;
