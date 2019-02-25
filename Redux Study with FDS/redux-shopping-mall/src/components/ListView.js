import React from 'react';
import { Link } from 'react-router-dom';

const ListView = ({ list }) => {
  return (
    <>
      <div>상품 목록 페이지</div>
      <div>
        <Link to="/list">전체</Link>&nbsp;|&nbsp;
        <Link to="/list?category=cap">모자</Link>
        &nbsp;|&nbsp;<Link to="/list?category=uniform">유니폼</Link>
        &nbsp;|&nbsp;
        <Link to="/list?category=marking">마킹키트</Link>&nbsp;|&nbsp;
        <Link to="/list?category=fashion">패션의류</Link>&nbsp;|&nbsp;
        <Link to="/list?category=cheer">응원용품</Link>
      </div>
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

export default ListView;
