import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const HeaderView = ({ isLogined, onLogout, history }) => {
  return (
    <>
      {isLogined ? (
        <button
          onClick={e => {
            e.preventDefault();
            onLogout();
            history.push('/');
          }}
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link to="/register">회원가입</Link>
          <Link to="/login">로그인</Link>
        </>
      )}
    </>
  );
};

export default withRouter(HeaderView);
