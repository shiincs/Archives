import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import NoMatchView from './NoMatchView';
import List from '../containers/List';
import Item from '../containers/Item';
import Register from '../containers/Register';
import Login from '../containers/Login';

import store from '../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={List} />
              <Route path="/list/:id" component={Item} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route component={NoMatchView} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
