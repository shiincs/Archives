# 26. `normalizr` 를 이용해서 API 응답을 표준화하기

`byId` 리듀서는 현재 서버 액션들을 각각 다르게 다뤄야만 합니다. 왜냐하면, 그것들은 응답 형태를 갖기 때문입니다.

예를 들어, `FETCH_TODOS_SUCCESS` 액션의 응답은 todos 배열입니다. 이 배열은 다음 상태로 넘어갈 때 순회되고 하나로 합쳐져야 합니다.

`ADD_TODO_SUCCESS` 에 대한 응답은 추가된 하나의 todo 입니다. 그리고 이 todo는 다른 방식으로 합쳐져야 합니다.

모든 새로운 API 호출에 대해 새로운 예시들을 추가하는 대신, 응답들을 표준화함으로써 응답 형태가 항상 같도록 해주길 원합니다.

#### `normalizr` 설치하기

`normalizr`는 API 응답들이 같은 형태를 갖도록 표준화하는데 도움을 주는 유틸리티 라이브러리입니다.

#### `schema.js` 만들기

`actions` 디렉토리 내부에 새로운 파일인 `schema.js`를 만들 것입니다.

`Schema` 생성자와 `normalizr`로부터 불러온 `arrayOf` 함수를 import 하면서 시작할 것입니다.

맨 처음 export된 schema는 `todo` 객체들에 대한 것이고, `todos`를 표준화된 응답에서의 딕셔너리의 이름으로 지정할 것입니다.

`arrayOfTodos`라고 불리우는 다음 schema는 `todo` 객체들의 배열들을 포함하는 응답들에 대한 것입니다.

```js
import { schema } from 'normalizr';

export const todo = new schema.Entity('todos');
export const arrayOfTodos = new schema.Array(todo);
```

#### 액션 크리에이터들을 업데이트하기

`actions/index.js` 내부에서, 우리가 `normalizr`로부터 import한 `normalize`라는 함수에 대한 named import를 추가할 것입니다. 또한 우리가 스키마 파일에서 정의했던 모든 스키마들에 대한 네임스페이스 import도 추가할 것입니다.

`FETCH_TODOS_SUCCESS` 콜백의 내부에서, "normalized response" 라는 로그를 추가할 것입니다. 그렇게 함으로써 표준화된 응답이 어떻게 생겼는지 볼 수 있습니다. 우리는 첫번째 인자로서의 원래의 `response`와 함께 `normalize` 함수를 호출합니다. 그리고 그와 일치하는 스키마(여기에서는, `arrayOfTodos`) 를 두번째 인자로 받습니다.

```js
return api.fetchTodos(filter).then(
  response => {
    console.log(
      'normalized response',
      normalize(response, schema.arrayOfTodos)
    );
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response,
    });
  },
```

`addTodo`도 비슷한 방법으로 업데이트 할 것입니다:

```js
export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    console.log(
      'normalized response',
      normalize(response, schema.todo)
    );
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response,
    })
  });
```

#### 응답들을 비교하기

이 시점에서, 액션에서의 응답은 todo 객체들의 하나의 배열입니다. 그러나, `FETCH_TODOS_SUCCESS`에 대한 표준화된 응답은 두개의 속성(`entities`와 `result`)을 포함하는 하나의 객체입니다.

`entities`는 그것의 id에 의한 응답에서의 모든 `todo`를 포함하는 `todos`라고 불리는 표준화된 딕셔너리를 포함합니다. `normalizr`는 뒤따르는 `arrayOfTodos` 스키마의 응답에서 이러한 `todo` 객체들을 찾습니다. 편리하게, 그것들은 ID에 의해 정렬되기 떄문에 룩업 테이블로 쉽게 병합될 것입니다.

두번째 속성은 `todo` ID들의 배열인 `result` 입니다. 그것들은 원래의 응답 배열에서 `todos`로서 같은 순위에 있습니다. 그러나, `normalizr`가 각각의 `todo`를 그것들의 ID로 대체하고, 모든 todo를 `todos` 딕셔너리에 옮겼습니다.

#### 액션 크리에이터 업데이트를 마무리하기

이제 액션 크리에이터들을 바꿀 것입니다. 그렇게 함으로써 그것들이  원래의 응답 대신 표준화된 응답을 응답 속성에 전달할 것입니다.

**Before**:

```js
return api.fetchTodos(filter).then(
  response => {
    console.log(
      'normalized response',
      normalize(response, schema.arrayOfTodos)
    );
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response,
    })
  },
```

**After:**

```js
return api.fetchTodos(filter).then(
  response => {
  	dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter:
      response: normalize(response, schema.arrayOfTodos),
    });
  },
```

#### 리듀서들을 업데이트하기

우리는 `byId` 리듀서에서 특별한 예시들을 지울 수 있습니다. 왜냐하면, 응답 형태가 표준화되었기 때문입니다. 액션 타입에 의한 전환 대신, 액션이 응답 객체를 가지고 있는지 여부로 체크할 것입니다.

**`byId` 리듀서 Before:**

```js
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS': // eslint-disable-line no-case-declarations
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      };
    default:
      return state;
  }
};
```

우리는 모든 존재하는 entries를 포함하는 새로운 버전의 룩업 테이블을 리턴할 것입니다. 뿐만 아니라, 표준화된 응답에서의 `entities.todos` 내부의 어떤 entries도 리턴할 것입니다. 다른 액션들에서는, 룩업 테이블을 그대로 리턴할 것입니다.

**`byId` 리듀서 After:**

```js
const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};
```

이제 새로운 `action.response` 형태에 대한 `createList.js` 내부의 `ids` 리듀서를 업데이트 해야 합니다.

**`ids` 리듀서 Before:**

```js
const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ?
          action.response.map(todo => todo.id) :
          state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ?
          [...state, action.response.id] :
          state;
      default:
        return state;
    }
  };
```

이제, 액션 응답은 `id`들의 배열(여기에서는 `FETCH_TODOS_SUCCESS`) 또는 수신된 todo의 단일 `id`(여기에서는 `ADD_TODO_SUCCESS`)중 하나인 `result` 속성을 갖습니다.

**`ids` 리듀서 After:**

```js
const ids = (state = [], action) => {
   switch (action.type) {
     case 'FETCH_TODOS_SUCCESS':
       return filter === action.filter ?
         action.response.result :
         state;
     case 'ADD_TODO_SUCCESS':
       return filter !== 'completed' ?
         [...state, action.response.result] :
         state;
     default:
       return state;
   }
 };
```

