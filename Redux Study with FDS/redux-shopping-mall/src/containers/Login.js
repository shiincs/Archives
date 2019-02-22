import React, { Component } from 'react';
import LoginView from '../components/LoginView';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    success: false,
  };

  handleInputChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    const { ...rest } = this.state;
    return (
      <LoginView
        handleInputChange={(e, name) => this.handleInputChange(e, name)}
        {...rest}
      />
    );
  }
}
