// import modules
import api from '../api';

// action name variables
const GET_LIST = 'redux-shopping-mall/list/GET_LIST';

// 상품 목록 관련 리듀서
const list = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case GET_LIST:
      return action.response.data;
    default:
      return state;
  }
};

// 액션 크리에이터들
// const getList = response => ({
//   type: GET_LIST,
//   response,
// });

// API 비동기 호출
const getListAPI = async () => {
  return await api.get('/products');
};

// 비동기 네트워크 통신부
export const fetchList = () => dispatch => {
  console.log('1111');
  return getListAPI.then(response => {
    console.log(response);
    dispatch({
      type: GET_LIST,
      response,
    });
  });
};

export default list;
