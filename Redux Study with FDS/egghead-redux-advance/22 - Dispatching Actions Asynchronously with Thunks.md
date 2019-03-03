# redux-dispatching-actions-asynchronously-with-thunks

Redux에서 비동기 액션 작성자를 작성하는 가장 일반적인 방법인 thunk에 대해 배웁니다.

# 요약

> action 이 객체를 반환하면 => dispatch() => reducer => state change

> action 이 함수를 반환 => middleware => action으로 dispatch 함수와, 다른 인자를 전달 => action을 실행 => 액션에서 dispatch() 실행 => reducer => state change

`src/configureStore.js`

> `thunk` 미들웨어 작성

```js
const thunk = store => next => action => {
  typeof action === "function" ? action(store.dispatch) : next(action);
};
```

---

`src/actions/index.js`

> `requestTodos` 를 더이상 export 하지 않음

> `requestTodos` 를 `fetchTodos` action creator 안에서 dispatch 하는 방식으로 사용

```js
const requestTodos = filter => ({
  type: "REQUEST_TODOS",
  filter
});

export const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};
```

---

`src/components/VisibleTodoList.js`

> `fetchData()`는 `requestTodos`를 사용하지 않음

```js
fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
```
