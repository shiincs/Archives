import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ListView = ({ list }) => {
  return (
    <>
      <div>상품 목록 페이지</div>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <Link to={`list/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// prop으로 내려줄 state의 list는 상품정보가 담긴 여러개의 객체를 포함하는 배열이다.
const mapStateToProps = state => ({
  list: state.list,
});

export default connect(
  mapStateToProps,
  null
)(ListView);
