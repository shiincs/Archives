import React from 'react';

const RegisterView = props => {
  return (
    <>
      <h1>회원가입 페이지</h1>
      <form onSubmit={() => props.handleRegister()}>
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
        <button>가입하기</button>
      </form>
    </>
  );
};

export default RegisterView;
