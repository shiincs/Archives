import api from '../api';

// 액션 타입 변수
const LOGIN_USER = 'redux-shopping-mall/user/LOGIN_USER';
const LOGOUT_USER = 'redux-shopping-mall/user/LOGOUT_USER';
const REGISTER_USER = 'redux-shopping-mall/user/REGISTER_USER';

// 초기 상태
const initialState = {
  id: null,
  username: null,
  isLogined: false,
};

// 리듀서
export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        id: action.id,
        username: action.username,
        isLogined: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        id: null,
        username: null,
        isLogined: false,
      };
    case REGISTER_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}

// 액션 크리에이터
const loginUser = (id, username) => ({
  type: LOGIN_USER,
  id,
  username,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const registerUser = () => ({
  type: REGISTER_USER,
});

// 액션 디스패치 실행부 (thunk creator)
export const fetchLoginUser = (username, password) => async dispatch => {
  try {
    await api
      .post('/users/login', {
        username,
        password,
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        dispatch(fetchRefreshUser());
      });
  } catch (e) {
    console.error(e);
  }
};

export const fetchRefreshUser = () => async dispatch => {
  try {
    await api.get('/me').then(res => {
      const { id, username } = res.data;
      dispatch(loginUser(id, username));
    });
  } catch (e) {
    console.error(e);
  }
};

export const fetchRegisterUser = (username, password) => async dispatch => {
  try {
    await api
      .post('/users/register', {
        username,
        password,
      })
      .then(res => {
        dispatch(registerUser());
      });
  } catch (e) {
    console.error(e);
  }
};

export const fetchLogoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
