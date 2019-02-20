import React from 'react';
import { connect } from 'react-redux';

// ListView 컴포넌트에서 Link를 통해 라우팅 전환될 때,
// 기존 컴포넌트의 데이터가 먼저 보이고나서 통신해서 받아온 데이터로 바뀌는 현상 발생 ...
const ItemView = ({ item }) => {
  return (
    <>
      <div>{item.title}</div>
      <img src={item.mainImgUrl} alt={item.title} />
    </>
  );
};

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(
  mapStateToProps,
  null
)(ItemView);
