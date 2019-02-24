import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginView from '../components/LoginView';

import { fetchLoginUser } from '../ducks/user';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { loginUser } = this.props;
    loginUser(username, password);
  };

  render() {
    const { ...rest } = this.state;
    const { isLogined } = this.props;

    return (
      <>
        {isLogined ? (
          <Redirect to="/" />
        ) : (
          <LoginView
            handleInputChange={(e, name) => this.handleInputChange(e, name)}
            handleLogin={() => this.handleLogin()}
            {...rest}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLogined: state.user.isLogined,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password) =>
    dispatch(fetchLoginUser(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
