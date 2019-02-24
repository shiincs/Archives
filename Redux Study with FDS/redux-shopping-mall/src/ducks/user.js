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

// 비동기 통신을 위한 API 호출부
const loginUserAPI = async (username, password) => {
  try {
    return await api.post('/users/login', {
      username,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};

const refreshUserAPI = async () => {
  try {
    return await api.get('/me');
  } catch (e) {
    console.error(e);
  }
};

const registerUserAPI = async (username, password) => {
  try {
    return await api.post('/users/register', {
      username,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};

// 액션 디스패치 실행부
export const fetchLoginUser = (username, password) => dispatch => {
  loginUserAPI(username, password).then(res => {
    const token = res.data.token;
    localStorage.setItem('token', token);
    dispatch(fetchRefreshUser());
  });
};

export const fetchRefreshUser = () => dispatch => {
  refreshUserAPI().then(res => {
    const { id, username } = res.data;
    dispatch(loginUser(id, username));
  });
};

export const fetchRegisterUser = (username, password) => dispatch => {
  registerUserAPI(username, password).then(res => {
    dispatch(registerUser());
  });
};

export const fetchLogoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
