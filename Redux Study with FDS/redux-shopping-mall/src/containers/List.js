import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListView from '../components/ListView';

import { fetchList } from '../ducks/list';

class List extends Component {
  componentDidMount() {
    // 리스트를 불러오는 함수를 prop으로 받아서 실행해준다.
    const { getList, queryString } = this.props;
    const params = new URLSearchParams(queryString);
    getList(params);
  }

  componentDidUpdate(prev) {
    const { getList, queryString } = this.props;

    // 이전 파라미터 조회
    const prevParams = new URLSearchParams(prev.queryString);
    const prevCategory = prevParams.get('category');

    // 현재 파라미터 조회
    const params = new URLSearchParams(queryString);
    const currentCategory = params.get('category');

    // 이전 카테고리와 현재 카테고리가 다르면 리스트를 받아온다.
    if (prevCategory !== currentCategory) {
      getList(params);
    }
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
const mapStateToProps = (state, ownProps) => ({
  list: state.list,
  isLoading: state.loading,
  queryString: ownProps.location.search,
});

const mapDispatchToProps = dispatch => ({
  // prop으로 함수를 넘겨준다.
  // API를 호출하는 함수를 dispatch의 인자로 넘겨줘야
  // 해당 함수에서 dispatch를 인자로 받아서 사용할 수 있다.
  getList: params => dispatch(fetchList(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
