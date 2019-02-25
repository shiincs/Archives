import React from 'react';
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

export default ListView;
