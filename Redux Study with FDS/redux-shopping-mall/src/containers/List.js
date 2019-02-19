import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListView from '../components/ListView';

import { fetchList } from '../ducks/list';

class List extends Component {
  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetchList();
  };

  render() {
    const { data } = this.props;
    console.log(data);
    return <ListView data={data} />;
  }
}

const mapStateToProps = state => ({
  data: state.list,
});
const mapDispatchToProps = dispatch => ({
  getPost: fetchList(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
