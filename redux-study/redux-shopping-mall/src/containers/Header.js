import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderView from '../components/HeaderView';

import { fetchRefreshUser, fetchLogoutUser } from '../ducks/user';

class Header extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.refreshUser();
    }
  }

  render() {
    const { isLogined, logoutUser } = this.props;
    return <HeaderView isLogined={isLogined} onLogout={() => logoutUser()} />;
  }
}

const mapStateToProps = state => ({
  isLogined: state.user.isLogined,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: () => dispatch(fetchRefreshUser()),
  logoutUser: () => dispatch(fetchLogoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
