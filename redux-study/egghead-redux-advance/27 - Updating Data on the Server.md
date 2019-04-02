# 27. 서버에서의 데이터를 업데이트하기

`toggleTodo` 액션 크리에이터를 thunk 액션 크리에이터로 바꾸면서 시작할 것입니다. 그렇게 함으로써 `dispatch`를 커링된 인자로서 추가합니다. 그 다음으로, `toggleTodo` API 엔드포인트를 호출하고, 되돌아올 응답을 기다릴 것입니다.

응답이 사용가능할 때, 우리는 `TOGGLE_TODO_SUCCESS` 타입의 액션과 응답을 디스패치할 것입니다. 원래의 `response`를 첫번째 인자로 넘기고, todo 스키마를 두번째 인자로 넘김으로써 `normalizr`를 다시한번 사용할 것입니다.

**업데이트된 `toggleTodo` 액션 크리에이터**

```js
export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });
```

#### `ids` 리듀서 업데이트하기

`createList.js` 내부에서, `TOGGLE_TODO_SUCCESS` 액션에 대한 새로운 case를 추가할 것입니다.

이 case에 대한 코드를 추출해서 `handleToggle`이라는 분리된 함수에 넣을 것입니다. 그리고 그 함수에 `state`와 `action`을 넘겨줄 것입니다.

```js
// Inside the `ids` reducer
  case 'TOGGLE_TODO_SUCCESS':
    return handleToggle(state, action);
```

`handleToggle` 함수를 `ids` 리듀서의 위에 놓을 것입니다. 그것은 `state`(ids의 배열)와 `TOGGLE_TODO_SUCCESS` 액션을 받습니다.

우리는 표준화된 응답으로부터 `result`를 `toggleId`와 `entities`로 분해할 것입니다. 그 다음으로, `toggleId`에 의한 `entities.todos` 참조로 얻은 `todo`로부터 `completed` 값을 읽어들일 것입니다.

우리가 리스트에서 지우기를 원하는 두 가지 경우가 있습니다:

- `completed` 속성은 `true`이지만 `filter` 속성이 `active`인 경우
- `completed` 속성은 `false`이지만 `filter` 속성이 `completed`인 경우

`shouldRemove`가 `true`인 경우, 우리는 토글된 todo의 id를 포함하지 않는 리스트의 사본을 리턴하기를 원합니다. 우리는 이것을 리스트를 id에 의해 필터링하고, 다른 id를 가진 것들을 남겨놓음으로써 해냅니다. 그렇지 않으면, 원래의 배열을 리턴합니다.

**완성된 `handleToggle` 함수**

```js
const handleToggle = (state, action) => {
  const { result: toggleId, entities } = action.response;
  const { completed } = entities.todos[toggleId];
  const shouldRemove = (
    (completed && filter === 'active') ||
    (!completed && filter === 'completed')
  );
  return shouldRemove ?
    state.filter(id => id !== toggleId) :
    state;
};
```





