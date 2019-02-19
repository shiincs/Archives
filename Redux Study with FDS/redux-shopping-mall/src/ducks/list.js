// import modules
import api from '../api';

// action name variables for ducks pattern
const GET_LIST = 'redux-shopping-mall/list/GET_LIST';

// 상품 목록 관련 리듀서
export default function list(state = [], action) {
  console.log(action);
  switch (action.type) {
    case GET_LIST:
      return [...state, ...action.response.data];
    default:
      return state;
  }
}

// 액션 크리에이터들
const getList = response => ({
  type: GET_LIST,
  response,
});

// 비동기 API 호출부
const getListAPI = async () => {
  return await api.get('/products');
};

// 비동기 네트워크 통신부
// 비동기로 API를 호출해서 나온 프로미스 결과값을 액션 크리에이터에 넣고, 디스패치한다.
export const fetchList = () => dispatch => {
  getListAPI().then(response => {
    dispatch(getList(response));
  });
};
