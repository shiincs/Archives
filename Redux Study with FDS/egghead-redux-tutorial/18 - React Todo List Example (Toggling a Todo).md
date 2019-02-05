# 18. React Todo List Example (Toggling a Todo)

Todo List Item에 클릭 핸들러를 달아서 유저가 아이템을 클릭할 때 스토어에 `TOGGLE_TODO` 타입의 액션과 `토글되어야 하는 id (todo 객체로부터 id를 얻어옴)`를 스토어에 디스패치합니다.

UI에서 해당 아이템이 완료되었을 때 수평선이 보이도록 하고싶기 때문에 textDecoration 스타일 속성을 사용합니다.

기존의 list item 엘리먼트를 렌더링하는 `<ul>` 코드를 아래와 같이 변경합니다.

```jsx
<ul>
  {this.props.todos.map(todo =>
    <li key={todo.id}
		// 클릭 핸들러를 달아서 디스패치를 할 수 있도록 해준다.
        onClick={() => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id
          });
        }}
        // completed 속성값에 따라 수평선을 보이도록 스타일링 해준다.
        style={{
          textDecoration:
            todo.completed ?
              'line-through' :
              'none'
        }}>
      {todo.text}
    </li>
  )}
</ul>
```



### (정리) todo item 토글링 작동 원리

클릭 핸들러 안에서 `TOGGLE_TODO` 타입과 렌더링되어야 하는 todo의 `id`가 담긴 액션을 디스패치 합니다.

액션이 디스패치되면, 스토어는 루트 리듀서를 호출하고, 루트 리듀서는 todos 배열과 액션을 가지고  `todos()` 리듀서를 호출할 것입니다.

액션 타입이 `TOGGLE_TODO` 이기 때문에 `todos()` 리듀서는 `state`의 모든 todo item 을 호출하는 `map()` 함수를 통해 모든 todo item의 핸들링을 `todo()` 리듀서에 위임합니다.

```js
const todos = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_TODO' stuff
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    // default case stuff
  }
}
```

`todo()` 리듀서는 todo item을 `state`로 받고, 'TOGGLE_TODO'를 `action`으로 받습니다. todo item의 `id`와 action의 `id`가 일치하지 않는 경우 (액션의 id는 `<li>` 엘리먼트를 클릭함으로써 얻어진다는 것을 기억합니다.), 이전의 `state`를 그대로 리턴합니다. 

그러나, todo item의 `id`가 action의 `id`와 일치한다면 ES6의 표기법을 사용해서기존의 todo의 속성과 토글된 `completed` 속성을 가진 새로운 객체를 리턴합니다.

```js
const todo = (state, action) => {
  // case 'ADD_TODO' stuff
  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state;
    }

    return {
      ...state,
      completed: !state.completed
    };
  // default case stuff
};
```

업데이트된 todo item은 애플리케이션의 새로운 `state` 의 `todos` 속성에 포함될 것입니다. 그리고 `render()` 함수가 스토어를 구독하고 있기 때문에 `store.getState()`를 통해서 애플리케이션의 다음 상태를 받고, 새로운 버전의 `todos` 배열을 `TodoApp` 컴포넌트에 전달해서 todo list가 렌더링 됩니다. (완료된 item은 수평선이 그려집니다.)

```jsx
const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
```

이러한 과정을 통해, 우리의 사이클은 다시한번 완료됩니다.