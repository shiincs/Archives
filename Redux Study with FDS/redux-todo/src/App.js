import React, { Component } from 'react';
import './App.css';

import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}

export default App;
