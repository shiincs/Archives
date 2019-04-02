// import modules
import api from '../api';
import { startLoading, finishLoading } from './loading';

// action name variables for ducks pattern
const GET_LIST = 'redux-shopping-mall/list/GET_LIST';

// 상품 목록 관련 리듀서
export default function list(state = [], action) {
  switch (action.type) {
    case GET_LIST:
      return action.response.data;
    default:
      return state;
  }
}

// 액션 크리에이터들
const getList = response => ({
  type: GET_LIST,
  response,
});

// 비동기 API 호출부 (사실 여기서 async/await 해줘봤자 큰 의미가 없는 듯 하다.)
const getListAPI = async params => {
  return await api.get('/products', {
    params,
  });
};

// 비동기 네트워크 통신부 (썽크 크리에이터)
// 비동기로 API를 호출해서 나온 프로미스 결과값을 썽크 크리에이터에 넣고, 디스패치한다.
export const fetchList = params => async dispatch => {
  try {
    // 로딩 인디케이터 시작
    dispatch(startLoading());

    // API 호출부 함수 내부에서 async / await을 정의해줬음에도 불구하고,
    // 해당 함수를 호출할 때 await으로 호출해주지 않으면
    // 비동기로 실행되면서 finally 구문의 finishLoading()이 먼저 디스패치 된다.
    // --> 왜...?
    await getListAPI(params).then(response => {
      dispatch(getList(response));
    });
  } catch (e) {
    console.error(e);
  } finally {
    // 로딩 인디케이터 종료
    dispatch(finishLoading());
  }
};
