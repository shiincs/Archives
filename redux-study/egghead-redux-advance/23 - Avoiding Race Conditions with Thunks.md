# redux-avoiding-race-conditions-with-thunks

Redux Thunk 미들웨어가 불필요한 네트워크 요청 및 잠재적 인 경쟁 조건을 피하기 위해 조건부로 action을 dispatch하는 방법을 배웁니다.

# 요약

## redux-thunk 사용 전

`src/configureStore.js`

> action 의 두번째 인자로 store.getState 함수를 전달

```js
const thunk = store => next => action => {
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
};
```

`src/actions/index.js`

> `getIsFetching` selector 를 가져와서 사용
> 인자로 받은 getState 를 action 에서 사용 할 수 있음
> 도움 필요

```js
import { getIsFetching } from "../reducers";
// ..
export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }
  // ...
};
```

## redux-thunk 사용 후

`src/configureStore.js`

> 기존의 thunk 작성분 삭제
> redux-thunk 로 대체

```js
import thunk from "redux-thunk";
```

---

`src/actions/index.js`

> `fetchTodos` 액션 크리에이터에서 `Promise.resolve()`반환
> 이유가 뭐죠?

```js
export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  // ...
};
```

---

`src/components/VisibleTodoList.js`

> 흠...?

```js
fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
    fetchTodos(filter).then(() => console.log("done!"));
  }
```
