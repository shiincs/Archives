import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './ducks';

// 사용할 미들웨어들을 넣어놓은 배열
const middlewares = [thunk];

// 스토어를 만들 때,
// 루트리듀서, compose(미들웨어, REDUX_DEVTOOL) 순서로 인자를 넣는다.
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
