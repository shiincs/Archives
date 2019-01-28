# 20. Extracting Presentational Components (Todo, TodoList)

프레젠테이셔널 컴포넌트를 추출해봅니다. (Todo, TodoList)



### 단일 Todo Item으로 리팩토링

우선, 개별 리스트 아이템을 렌더링하는 Todo 컴포넌트를 추출할 것입니다.

Todo Item을 리액트 14버전에서 사용가능한 함수로 선언할 것입니다. `key` 속성은 배열을 열거할 대에만 사용할 수 있기 때문에 지울 수 있습니다. (많은 todos를 열거해야 할 때 나중에 다시 사용합니다.)

이전에 `TOGGLE_TODO`를 디스패치하는 클릭 핸들러를 하드코딩 했었습니다. 리액트에서 어떤 행동(동작)을 지정하지 않으면서 오직 어떻게 렌더링 되는지(어떻게 보여지는지)에 대해서만 신경쓰는 컴포넌트들을 여러개 만드는 것은 최고의 관습(Best Practice) 입니다. 이러한 것들은 **presentational component** 라고 불립니다.

우리는 리스트가 프레젠테이셔널 컴포넌트가 되길 원하기 때문에, `onClick` 핸들러가 prop이 되기를 권장합니다.

또한 컴포넌트에서 렌더링되어야하는 데이터가 어떤 것인지를 좀 더 명시적으로 드러내기를 원합니다. 그래서 `todo` 객체를 넘겨주기보다는 `completed`와 `text` 속성을 개별 props로 넘겨줄 것입니다.

```jsx
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
);
```

이제 `Todo` 컴포넌트는 순수한 프레젠테이셔널 컴포넌트 입니다. 어떠한 행동(동작)도 지정하지 않지만, 단일 todo item을 어떻게 렌더링해야 할지를 알고 있습니다.



### Todo List 리팩토링

`TodoList` 컴포넌트는 todos의 배열을 받고, 각각의 todo item을 `Todo` 컴포넌트로 렌더링 하기 위한 `todos.map()` 함수를 사용함으로써 `<ul>` 안에 그것들을 렌더링 할 것입니다.

우리는 리액트로 하여금 각각의 todo 들의 `id`를 엘리먼트들을 위한 유일한 `key`로 사용하도록 할 것이고, `todo` 객체의 `text`와 `completed` 속성들이 `Todo` 컴포넌트에 props로 넘겨지도록 전개 연산자를 사용할 것입니다.

우리는 `Todo` 컴포넌트가 클릭될 때 무슨 일이 일어나야 하는지를 지정해야 합니다. 우리는 이 컴포넌트를 프레젠테이셔널 컴포넌트로 두기를 윈하기 때문에 액션을 디스패치 하기보다는 `onTodoclick()` 함수를 지정하고 그것에 인자로 `todo.id`를 넘겨서 어떤 것에 무슨 일이 일어나야 하는지를 결정할 수 있도록 할 것입니다.

```jsx
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)
```



### Container Components (`TodoApp`)

프레젠테이셔널 컴포넌트가 단지 데이터를 보여주는 반면, 실제로 스토어로부터 데이터를 전달하는 방법이 필요합니다. 이러한 일들은 **container components** 에서 일어납니다. 컨테이너 컴포넌트는 행동(동작)을 지정하고 데이터를 전달합니다.

예제에서, `TodoApp` 은 컨테이너 컴포넌트 입니다.

우리는 `TodoList`와 `Todo` 프레젠테이셔널 컴포넌트들을 만들었고, 그것들을 `TodoApp` 컨테이너 컴포넌트에 둘 수 있습니다.

`TodoApp` 컴포넌트는 `visibleTodos`를 `todos` prop 으로 넘겨서 `TodoList` 컴포넌트를 렌더링하고, `onTodoclick` 함수가 todo의 `id`와 함께 호출될 때 스토어에 `id`와 함께 `TOGGLE_TODO` 타입의 액션을 디스패치하는 콜백을 갖고 있습니다.

```jsx
class TodoApp extends Component {
	render () {
    const {
      todos,
      visibilityFilter
    } = this.props;

    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );

    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />
      .
      . // FilterLink stuff
      .
      </div>
    );
  }
}
```



### 정리

`TodoApp` 컴포넌트는 `TodoList` 컴포넌트를 렌더링하고, 액션을 디스패치할 수 있는 함수를 같이 넘깁니다.

`TodoList` 컴포넌트는 `Todo` 컴포넌트를 렌더링하고, `onTodoClick()` 함수를 호출하는 `onClick` prop을 넘깁니다.

`Todo` 컴포넌트는 `onClick` prop을 받아서 list item의 `onClick` 메서드에 바인드 시킵니다.  이 메서드가 호출될 때 액션을 디스패치하는 `onTodoClick()` 함수가 호출되고, 이어서 액션이 스토어를 업데이트할 때 보여지는 todos를 업데이트 합니다. (리렌더링합니다.)