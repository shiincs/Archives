import React, { Component } from 'react';

import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

import { toggleTodo } from '../actions';
import { withRouter } from 'react-router-dom';

import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => {
  filter = filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

// const mapDispatchToProps = dispatch => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    // mapDispatchToProps
    { onTodoClick: toggleTodo }
  )(VisibleTodoList)
);

export default VisibleTodoList;
