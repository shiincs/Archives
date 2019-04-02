# 20. Refactoring the Reducers

## BEFORE

1. src/reducers/index.js

```js
import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
```

1. src/reducers/todos.js

(상동)

## AFTER

1. src/reducers/index.js

삭제

- 일전에 visibilityFilter 리듀서를 없애면서, index.js 에는 todos 리듀서만 combineReducers 메소드 안에 들어 있었다. todo 리듀서가 대신하는 역할을 할 수 있으므로, index.js 는 삭제한다.

1. src/reducers/todos.js => src/reducers/index.js

이름 변경 => index.js

1. src/reducers/byId.js

```js
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

export default byId;

// state, id를 인자로 받는 셀렉터 함수를 생성
export const getTodo = (state, id) => state[id];
```

1. src/reducers/createList.js

allIds, activeIds, completedIds 가 action.filter 를 거르는 부분을 제외하고는 동일하다. 따라서, filter 를 인수로 받고 reducer 함수를 반환하는 createList 함수를 만든다.

```js
const createList = filter => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };
};

export default createList;

// 셀렉터의 형태로 상태에 액세스 하기 위한 퍼블릭 API를 추가. getId는 일단 state를 입력받아 반환하지만, 추후 변경될 예정.
export const getIds = state => state;
```

1. src/reducers/index.js

```js
import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// filter 인수 자리에 all, active, completed를 넣어 새로운 reducer를 생성.
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  // 별도 파일에 관리하므로 상태에 id가 들어있는지는 불분명하므로
  // 리듀서의 이름을 listByFilter로 바꾸고 getIds라는 이름의 셀렉터를 사용.
  const ids = fromList.getIds(state.listByFilter[filter]);
  // 마찬가지로 byId 리듀서가 lookup table임을 드러낼 필요는 없으므로
  // fromById.getTodo 셀렉터를 통하여 state, id를 입력 받는다.
  return ids.map(id => fromById.getTodo(state.byId, id));
};
```

