import React, { Component } from 'react';
import './App.css';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const App = ({ match }) => (
  <div className='App'>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
