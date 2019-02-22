import { combineReducers } from 'redux';
import list from './list';
import item from './item';
import user from './user';

// 모든 리듀서를 합친 루트 리듀서
export default combineReducers({
  list,
  item,
  user,
});
