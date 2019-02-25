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
    const { list, isLoading } = this.props;
    if (isLoading) {
      return <p>Now Loading...</p>;
    }
    return <ListView list={list} />;
  }
}

// prop으로 내려줄 state의 list는 상품정보가 담긴 여러개의 객체를 포함하는 배열이다.
const mapStateToProps = state => ({
  list: state.list,
  isLoading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // prop으로 함수를 넘겨준다.
  // API를 호출하는 함수를 dispatch의 인자로 넘겨줘야
  // 해당 함수에서 dispatch를 인자로 받아서 사용할 수 있다.
  getList: () => dispatch(fetchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
