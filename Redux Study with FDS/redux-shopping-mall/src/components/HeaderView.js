import React from 'react';
import { Link } from 'react-router-dom';

const HeaderView = ({ isLogined }) => {
  return (
    <>
      {isLogined ? (
        <Link to="/">로그아웃</Link>
      ) : (
        <>
          <Link to="/register">회원가입</Link>
          <Link to="/login">로그인</Link>
        </>
      )}
    </>
  );
};

export default HeaderView;
