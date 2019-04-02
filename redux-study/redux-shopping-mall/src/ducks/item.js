import api from '../api';
import { startLoading, finishLoading } from './loading';

const GET_ITEM = 'redux-shopping-mall/item/GET_ITEM';

// 개별 상품 관련 리듀서
export default function item(state = {}, action) {
  switch (action.type) {
    case GET_ITEM:
      return action.response.data;
    default:
      return state;
  }
}

// 액션 크리에이터
const getItem = response => ({
  type: GET_ITEM,
  response,
});

// 비동기 네트워크 통신부 (thunk creator)
export const fetchItem = id => async dispatch => {
  try {
    dispatch(startLoading());

    await api.get(`/products/${id}`).then(response => {
      dispatch(getItem(response));
    });
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(finishLoading());
  }
};
