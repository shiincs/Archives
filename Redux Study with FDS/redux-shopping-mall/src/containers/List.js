import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListView from '../components/ListView';

import { fetchList } from '../ducks/list';

class List extends Component {
  componentDidMount() {
    // 리스트를 불러오는 함수를 prop으로 받아서 실행해준다.
    const { getList } = this.props;
    getList();
  }

  render() {
    return <ListView />;
  }
}

const mapDispatchToProps = dispatch => ({
  // prop으로 함수를 넘겨준다.
  // API를 호출하는 함수를 dispatch의 인자로 넘겨줘야
  // 해당 함수에서 dispatch를 인자로 받아서 사용할 수 있다.
  getList: () => dispatch(fetchList()),
});

export default connect(
  null,
  mapDispatchToProps
)(List);
