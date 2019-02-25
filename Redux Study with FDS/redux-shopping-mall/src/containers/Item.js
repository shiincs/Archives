import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemView from '../components/ItemView';

import { fetchItem } from '../ducks/item';

class Item extends Component {
  componentDidMount() {
    const { itemId, getItem } = this.props;
    getItem(itemId);
  }

  render() {
    const { item, isLoading } = this.props;
    if (isLoading) {
      return <p>Now Loading...</p>;
    }
    return <ItemView item={item} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: state.item,
  isLoading: state.loading,
  itemId: ownProps.match.params.id,
});

const mapDispatchToProps = dispatch => ({
  getItem: id => dispatch(fetchItem(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
