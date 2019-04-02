Redux: Colocating Selectors with Reducers

reducer file 에 state shape 에 대한 정보를 encapsulate하여,
component가 의존하지 않도록 하는 법을 배웁니다.

`./reducers/todos.js`

```js
// ... todos reducer
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case "all":
      return state;
    case "completed":
      return state.filter(t => t.completed);
    case "active":
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
```

`./reducers/index`

```js
import todos, * as fromTodos from "./todos";

// ... combinereducers

export const getVisibleTodos = (state, filter) => {
  fromTodos.getVisibleTodos(state, filter);
};
```

`./components/VisibleTodoList.js`

```js
import { getVisibleTodos } from "../reducers";

// ...

const mapStateToProps = (state, { match: { params } }) => {
  return {
    todos: getVisibleTodos(state, params.filter || "all")
  };
};
```
