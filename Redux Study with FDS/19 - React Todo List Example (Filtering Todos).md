# 19. React Todo List Example (Filtering Todos)

유저가 보고싶은 아이템만 필터해서 볼 수 있는 visibility filter 를 만들 것입니다.

유저가 클릭함으로써 현재 보여지는 아이템들을 전환하는 새로운 `FilterLink` 컴포넌트를 만들면서 시작합니다. 이 컴포넌트는 `filter` prop (문자열) 과 `children`  prop(링크의 내용)을 전달받습니다.

컴포넌트는 단순한 `<a>` 태그로 만들어질 것이며, `filter` prop과 함께 `SET_VISIBILITY_FILTER` 타입의 액션을 디스패치 할 것이기 때문에 어떤 필터가 클릭되었는지를 리듀서가 알 수 있습니다.

`<a>` 태그에 `children` prop을 같이 내려줄 것이기 때문에 링크의 텍스트를 지정해줄 수도 있습니다.

```jsx
.
. // Reducer code, etc.
.
const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         });
       }}
    >
      {children}
    </a>
  )
}
.
.
.
```

위의 코드처럼 `FilterLink` 컴포넌트를 만들었습니다. 이 컴포넌트를 `TodoApp` 컴포넌트에서 사용할 수 있습니다.

```jsx
.
. // TodoApp component stuff including the the <ul> of todo items...
. // This <p> tag is to be rendered below the list.
<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
  >
    All
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_ACTIVE'
  >
    Active
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_COMPLETED'
  >
    Completed
  </FilterLink>
</p>
.
. // close the containing `<div>` and the TodoComponent
.
```

이제 필터를 선택할 수 있는 몇개의 링크를 만들었습니다. 하지만 이 링크들은 눈에 보이는 효과는 없습니다. visibility filter의 값을 지정해주지 않았기 때문입니다.

필터값에 따라 `todos` 배열을 필터링해주는 `getVisibleTodos()` 함수를 만들어야 합니다.

`getVisibleTodos()` 함수는 두개의 인자를 받습니다. `todos` 리스트와 `filter` 가 그것입니다. 이 함수의 내부에는 현재의 필터값을 기반으로 동작하는 스위치 구문이 들어있습니다.

```js
.
. // FilterLink component creation
.

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      // Use the `Array.filter()` method
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}
```

이제 리스트를 렌더링하기 전에 `TodoApp` 컴포넌트에서 `getVisibleTodos()` 함수를 호출해야 합니다.

`TodoApp` 컴포넌트의 `render()` 함수에서 `todos` 리스트와 `visibilityFilter` 를 props로부터 받아와서 `getVisibleTodos()` 함수를 호출함으로써 눈에 보이는 todos를 가져옵니다.

이제 리스트를 렌더링할 때 `this.props.todos` 대신  `visibleTodos` 변수를 사용할 수 있습니다.

```jsx
.
.
.
class TodoApp extends Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );
    .
    . // Input and Button stuff
    .
    <ul>
      {visibleTodos.map(todo =>
        .
        . // `<li>` click handling and item rendering
        .
      )}
    </ul>
    .
    . // `<p>` filter selection stuff
    .
  }
}
```

`TodoApp` 컴포넌트 내부에서 `visibilityFilter` 를 사용하기 위해서는 `render()` 함수에서 반드시 그것을 prop으로 넘겨줘야 합니다. 이를 명시적으로 할수도 있지만, `state` 객체 안의 속성들을 펼쳐서 props로 컴포넌트에 넘겨주는 것이 좀 더 빠릅니다.

```jsx
const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
```

이제 todo item 들을 추가하고 그것을 '완료' 했을 때, 우리가 선택한 필터에 따른 리스트를 볼 수 있습니다.

하지만, 우리가 이미 선택한 필터 링크를 보여주는 더 멋진 방법이 있습니다.

분해대입 연산자를 이용해서 `TodoApp` 컴포넌트 안에서 props로부터 `todos`와 `visibilityFilter` 를 뽑아낼 수 있습니다. 이제 `this.props.`를 매번 타이핑하지 않아도 그것들에 직접 접근할 수 있습니다.

```jsx
class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return (
     .
     . // input, button, and list stuff
     .
```

이제 `FilterLink` 컴포넌트에 현재 `visibilityFilter`를 포함시킵니다. 이렇게 하면 현재 어떤 것이 선택되었는지 알 수 있고, 각각 다른 스타일을 적용시킬 수 있습니다.

```jsx
<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
    currentFilter={visibilityFilter}
  >
    All
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_ACTIVE'
    currentFilter={visibilityFilter}
  >
    Active
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_COMPLETED'
    currentFilter={visibilityFilter}
  >
    Completed
  </FilterLink>
</p>
```

`visibilityFilter`를 포함시켰다면, `FilterLink` 컴포넌트 선언문으로 돌아가 `currentFilter`를 props에 추가시킵니다. 그리고 필터가 현재 필터와 같을 때의 조건문을 추가해줍니다.

```jsx
const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  .
  . // rest of `FilterLink` as defined earlier
  .
}
```



### (정리) visibility filter 변동의 작동 원리

필터중 하나를 선택하면 `SET_VISIBILITY_FILTER` 타입의 액션과 `FilterLink` 컴포넌트에서 prop으로 받은 `filter`를 디스패치합니다. (3개의 링크들은 각각 다른 `filter` prop을 받습니다.)

`store.dispatch()` 함수는 `todoApp()` 루트 리듀서를 state와 action과 함께 호출합니다. 그리고 차례로 `visibilityFilter()` 리듀서를 state와 action과 함께 호출합니다.

리듀서에 들어가는 액션의 타입이 `SET_VISIBILITY_FILTER` 타입일 때, 이전의 state들은 신경쓰지 않습니다. 그것은 그저 `visibilityFilter()`의 다음 상태로 `action.filter`를 리턴할 뿐입니다. 루트 리듀서는 새로운 `state` 객체의 일부분으로 이러한 새로운 속성을 사용할 것입니다.

`render()` 함수가 스토어의 변화를 구독하기 때문에, 새로운 `state` 객체를 받고 그것의 키들을 `TodoApp` 컴포넌트에 props로 넘겨줍니다.

`TodoApp` 컴포넌트는 모든 `todos`를 받고, 새로 업데이트된 `visibilityFilter`도 props로 받습니다. 그리고는 그것들을 `getVisibleTodos()` 함수에 넘겨줍니다. 이 함수에서는 현재의 visibility filter ('SHOW_ALL', 'SHOW_COMPLETED', or 'SHOW_ACTIVE') 에 기반해 계산된 현재의 보여지는 `todos`를 만들어냅니다.

어떤 필터가 선택되느냐에 따라 `getVisibleTodos()` 함수는 해당하는 아이템들만 포함하는 새로운 배열을 리턴할 것입니다. 이 배열은 `TodoApp` 컴포넌트의 `render()` 함수 안에서 열거되고 렌더링됩니다.

`FilterLink` 컴포넌트는 필터값이 현재의 값과 같은 것인지를 알고싶어하기 때문에 `visibilityFilter` 속성은 `FilterLink` 컴포넌트에서 `currentFilter`로도 사용되며, 그에 맞게 적절하게 스타일링할 수 있습니다. (예를 들어, 현재 필터가 활성화되어 있다면 유저는 그것을 클릭할 수 없습니다.)

... 그래서 이 사이클은 끝났습니다.