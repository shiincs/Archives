import React, { Component } from 'react';
import HeaderView from '../components/HeaderView';

export default class Header extends Component {
  state = {
    isLogined: false,
  };

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.setState({
        isLogined: true,
      });
    }
  }
  render() {
    const { isLogined } = this.state;
    console.log(isLogined);
    return <HeaderView isLogined={isLogined} />;
  }
}
