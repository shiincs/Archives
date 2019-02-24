import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RegisterView from '../components/RegisterView';

import { fetchRegisterUser } from '../ducks/user';

class Register extends Component {
  state = {
    username: null,
    password: null,
  };

  handleInputChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleRegister = () => {
    const { username, password } = this.state;
    const { registerUser, history } = this.props;
    registerUser(username, password);
    alert('회원가입이 완료되었습니다. 로그인 후 이용하세요.');
    history.push('/');
  };

  render() {
    return (
      <RegisterView
        handleInputChange={(e, name) => this.handleInputChange(e, name)}
        handleRegister={() => this.handleRegister()}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  registerUser: (username, password) =>
    dispatch(fetchRegisterUser(username, password)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Register)
);
