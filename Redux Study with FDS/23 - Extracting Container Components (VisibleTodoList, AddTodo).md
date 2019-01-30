## 23. Extracting Container Components (VisibleTodoList, AddTodo)

이제 `TodoList` 컴포넌트에 대해 작업합니다. 우리는 그것을 프레젠테이셔널 컴포넌트로 두고 싶습니다. 하지만 현재 visible todos 를 읽는 것을 `TodoList`를 리덕스 스토어에 연결시킨 분리된 컨테이너 컴포넌트로 캡슐화 하고 싶습니다.

이 컴포넌트는 `VisibleTodoList`로 불릴 것입니다. 우리가 `FilterLink` 컴포넌트를 만들었을 때 처럼, `VisibleTodoList` 에 대한 데이터는 현재의 `state`를 사용함으로써 계산될 것입니다. 우리는 리덕스 스토어의 모든 `todos`를 통해 `getVisibleTodos()`를 사용할 것이고, `visibilityFilter`에 따라 어떤 것이 보여저야 하는지를 결정할 것입니다.

또한 우리는 `id`와 함께 `TOGGLE_TODO` 타입의 액션을 디스패치하기 위해 `onTodoClick()` 함수의 동작을 지정할 것입니다.

`FilterLink` 컴포넌트에서 사용했던것과 같은 구독 로직 또한 포함될 필요가 있습니다.

```jsx
class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}
```

기억하세요, 모든 컨테이너 컴포넌트들의 임무는 비슷합니다. -- 프레젠테이셔널 컴포넌트를 리덕스 스토어에 연결시키고, 그것이 필요로 하는 데이터와 동작을 지정합니다.

이제 우리는 `TodoApp`에서 `TodoList`를 새로 만든 `VisibleTodoList`로 대체할 수 있습니다.

### `AddTodo`를 컨테이너로 바꾸기

이전 섹션에서 우리는 `AddTodo`를 프레젠테이셔널 컴포넌트로 만들었습니다. 이제 우리는 이것을 역추적 할 것입니다.

`onClick` 핸들러를 `TodoApp`에서 `AddTodo` 컴포넌트로 옮기면서 시작합니다. 왜냐하면, 여기에는 보여지는 부분이나 동작이 없고, 우리가 보여지는 부분을 동작으로부터 분리하는 법을 이해하기 전까지는 같이 모아놓는 것이 더 쉽기 때문입니다. 예를 들어, 나중에 우리는 폼 컴포넌트를 사용하기로 결정할 수도 있습니다.

```jsx
const AddTodo = () => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
```

### 리팩토링된 `TodoApp`

이제 우리는 컴포넌트들을 리팩토링 했습니다. `TodoApp` 컴포넌트의 어떤 컨테이너들도 props를 갖지 않아서 깔끔해졌습니다! 또한 우리는 스토어의 현재 state를 렌더링했던 `TodoApp`의 `render()` 메서드를 제거할 수 있습니다.

`TodoApp` 내부의 컨테이너 컴포넌트들은 이제 그것들 스스로 상태를 받고 업데이트할 수 있도록 설정되었기 때문에 `render()` 메서드를 제거할 수 있습니다. 따라서, 우리는 `TodoApp`을 초기에 한 번만 렌더링 해주면 됩니다.

```jsx
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

// Note this render does not belong to `TodoApp`
ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
```



### 정리

(생략)