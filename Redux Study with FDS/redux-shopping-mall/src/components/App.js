import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NoMatchView from './NoMatchView';
import List from '../containers/List';
import Item from '../containers/Item';

import store from '../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/list/:id" component={Item} />
            <Route component={NoMatchView} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
