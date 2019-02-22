import React from 'react';

const LoginView = props => {
  return (
    <form>
      <input
        type="text"
        placeholder="아이디"
        value={props.username}
        onChange={e => props.handleInputChange(e, 'username')}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={props.password}
        onChange={e => props.handleInputChange(e, 'password')}
      />
      <button>로그인</button>
    </form>
  );
};

export default LoginView;
