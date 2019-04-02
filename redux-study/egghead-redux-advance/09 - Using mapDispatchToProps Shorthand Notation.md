# 09. mapDispatchToProps()를 사용한 단축 표기법

mapDispatchToProps 함수는 액션을 디스패치할 수 있는 React 컴포넌트에 특정 prop 을 주입합니다. 예를 들어, TodoList 컴포넌트는 Todo 의 ID 를 받는 `onTodoClick` 콜백 prop 을 호출합니다.

```js
// TodoList.js
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);
```

`mapDispatchToProps` 내에서 `onTodoClick`이 ID 와 같이 호출될 때 그 ID 로 `toggleTodo` 액션을 디스패치하도록 지정합니다. toggleTodo 의 액션 크리에이터는 그 ID 를 사용하여 디스패치될 액션 객체를 생성합니다.

```js
// VisibleTodoList.js
const mapDispatchToProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

// index.js
export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
```

콜백 prop 에 대한 인수가 액션 크리에이터에 대한 인수와 정확히 일치한다면, mapDispatchToProps 를 더 짧게 적을 수 있는 방법이 있습니다.

함수를 전달하는 대신, 특별한 객체인 map 을 전달하는 것입니다. 우리가 주입하고자 하는 콜백 prop 들의 이름과 해당하는 액션을 생성하는 액션 크리에이터 함수 사이에 생성할 수 있습니다.

```js
// VisibleTodoList.js

const VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
  )(TodoList)
);
```

이는 꽤나 일반적인 사례입니다. 따라서 mapDispatchToProps 를 작성할 필요가 없고, 대신 이 map 을 객체에 전달할 수 있습니다.

요약해 보겠습니다. 일반적으로 mapDispatchToProps 는 dispatch 함수를 인자로 받아들입니다. dispatch 함수를 사용하여 특정 액션을 디스패치할 수 있는 각각의 컴포넌트에 주입하여 prop 을 반환 받습니다.

```js
// VisibleTodoList.js

// const mapDispatchToProps = (dispatch) => ({
// onTodoClick (id) {
// dispatch (toggleTodo (id));
//},
//});
```

그러나 콜백 prop 을 통과한 인수는 동일한 순서로 액션 크리에이터에게 전달되는 것이 일반적입니다. 이 경우 mapDispatchToProps 함수를 직접 작성하는 대신 콜백 prop 의 이름을 해당 액션 크리에이터 함수에 매핑하는 구성(configuration) 객체를 전달할 수 있습니다.

```js
// VisibleTodoList.js

const VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
  )(TodoList)
);
```