# redux-displaying-loading-indicators

데이터를 가져 오는 동안로드 표시기를 표시하는 방법을 배웁니다.

# 요약

`src/components/VisibleTodoList.js`

> 로딩 인디케이터 렌더링 조건 추가

> TodoList 로 내려줄 todos props 직접 state 의 todo 로 변경

> `getIsFetching`(selector in reducer?), `requestTodos`(action) prop 추가

```js
// ...
import { getVisibleTodos, getIsFetching } from "../reducers";
// ...
fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
}
// ...
render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
  }
```

---

`src/actions/index.js`

> `requestTodos` action creator 작성

```js
// ...
export const requestTodos = filter => ({
  type: "REQUEST_TODOS",
  filter
});
// ...
```

---

`src/reducers/createList.js`

> `ids` reducer, `isFetching` reducer 수정, 작성

> 질문 : `createList`은 무엇이라고 생각하십니까?

> 결과적으로 `ids` reducer, `isFetching` reducer를 만든 셈

> `getIds` selector 의 return 값을 state.id 로 변경

> `getIsFetching` selector 작성 isFetching state를 반환

```js
import { combineReducers } from "redux";

const createList = filter => {
  return (state = [], action) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_TODOS":
        return true;
      case "RECEIVE_TODOS":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  });
};

export default createList;

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
```

---

`src/reducers/index.js`

> `getIsFetching` 작성

```js
// ...
export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);
```
