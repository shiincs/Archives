# 21. Extracting Presentational Components (AddTodo, Footer, FilterLink)

### Extracting the Input and the Button into `AddTodo`

input과 button을 하나의 새로운 컴포넌트인 `AddTodo` 에 병합할 것입니다.

함수형 컴포넌트는 인스턴스를 갖지 않습니다. 그래서 `this`를 쓰는 대신, `input` 이라는 변수를 쓸 것이고, 이 변수를 함수의 내부에서 사용할 수 있습니다. 

우리는 `AddTodo` 컴포넌트가 프레젠테이셔널 컴포넌트가 되기를 원하기 때문에, `input`의 값을 파라미터로 받는 `onAddClick()` 함수를 호출하는 버튼을 만들 것입니다. 또한 `onAddClick`을 prop으로 만들어서 `AddTodo` 컴포넌트를 이용하는 컴포넌트가 버튼을 눌렀을 때 어떤 일이 일어나도록 지정해줄 수 있습니다.

```jsx
const AddTodo = ({
  onAddClick
}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
```

이제 `<input>`과 `<button>` 진입점을 새로운 `AddTodo` 컴포넌트로 바꿔서 `TodoApp` 컨테이너 컴포넌트를 업데이트해야 합니다.

또한 `onAddClick` 함수가 `ADD_TODO` 타입의 액션과 함께 `text`와 `id`를 디스패치하도록 지정해줍니다.

```jsx
.
. // inside `TodoApp`'s `render` method
.
return (
  <div>
    <AddTodo
      onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text  
        })
      }
    />
.
.
.
```

### Extracting `FilterLink` Footer Elements

 이제 `Footer`라는 새로운 함수형 컴포넌트를 만들 것입니다. 각각의 `FilterLink` 컴포넌트는 `visibilityFilter`에 대해 알 필요가 있기 때문에 그것을 prop으로 만들 것입니다.

`Footer`와 `FilterLink` 가 프레젠테이셔널 컴포넌트가 되어야 하지만, 현재는 각각의 `FilterLink`가 `store.dispatch()` 호출을 갖고 있습니다. 이 호출은 filter를 단일 파라미터로 받는  `onClick` 호출에 의해 대체될 것입니다. 또한 `onClick`을 `FilterLink`의 props로 추가합니다.

`onClick`은 현재 `FilterLink`의 prop이기 때문에 `Footer`에서 `FilterLink`가 쓰이는 곳마다그것을 매번 지정해줄 필요가 있습니다. `onClick={onFilterClick}` 코드를 추가하면 `onClick` 을 `FilterLink`에 prop으로 내려줍니다.

```jsx
// FilterLink was built in a previous section
const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
      {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
);
```

### Adding `Footer` to `TodoApp`

`TodoApp` 컴포넌트에 `Footer` 컴포넌트를 추가할 때, 두 가지의 props를 넘겨줘야 합니다. 첫째는 활성화된 링크를 하이라이팅 하기 위한 `visibilityFilter` 이고, 둘째는 클릭된 `filter`와 함께 `SET_VISIBILITY_FILTER` 타입의 액션을 디스패치하는 `onFilterClick` 입니다.

```jsx
.
. // inside `TodoApp`'s `render` method
.
return (
  <div>
    // `<AddTodo>` component
    // `<TodoList>` component
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
.
.
.
```

### Changing `TodoApp` into a function (`TodoApp` 컴포넌트를 함수로 변환)

`TodoApp` 컴포넌트를 클래스에서 함수로 바꾸는 것이 가능합니다.

이는 `render` 함수 내부의 `this.props`로부터 `todos`와 `visibilityFilter`의 분해대입을 제거할 수 있도록 해줍니다. 대신, 우리는 이를 `TodoApp` 함수의 인자로 선언할 수 있습니다.

또한 `render()` 선언을 하지 않아도 됩니다.

`visibleTodos` 변수는 단 한곳에만 사용되기 때문에, 변수의 내용을 `TodoList` 컴포넌트의 `todos` prop으로 선언할 수 있습니다. (변수에 할당하지 않고 함수호출을 직접 prop으로 넘깁니다.)

```jsx
const TodoApp = ({
  todos,
  visibilityFilter
}) => {
  return (
    <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text
          })
        }
      />
      <TodoList
        todos={
          getVisibleTodos(
            todos,
            visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      />
    </div>
  );
}
```

### (정리) 데이터 흐름

우리는 `TodoApp` 이라고 불리는 하나의 컨테이너 컴포넌트를 갖고 있습니다. 스토어가 변할 때마다 매번 이것을 리렌더링 합니다. 이 컴포넌트는 전역 상태 객체의 key 들을 props 로 받아서 `todos`와 `visibilityFilter`를 받습니다.

첫 번째로 랜더링되는 컴포넌트는 `Todo` 입니다. `Todo`는 input과 button을 렌더링하는 프레젠테이셔널 컴포넌트입니다. 버튼이 클릭될 때, 현재의 input값을 클릭 함수에 전달합니다.

클릭 함수는 `Todo` 컴포넌트의 prop입니다. 버튼이 클릭될 때, 현재 text를 포함하는 액션을 디스패치하는 것이 여기에서 정의됩니다. todo 액션을 디스패치하면 리듀서를 호출하고, 새로운 todos로 스토어를 업데이트 하고, 새로운 todos로 컴포넌트를 리렌더링 할 것입니다.

todos는 현재 보여지는 todos와 todo 클릭 콜백을 props로 받는  `TodoList` 프레젠테이셔널 컴포넌트에 의해 렌더링 됩니다.

`TodoList` 컴포넌트는 todos 배열을 받아서 map 을 거쳐 각각의 `Todo` 컴포넌트로 렌더링합니다. 그것은 `todo` 객체의 모든 속성들을 `Todo` 컴포넌트에 prop으로 내려주기 위해 전개 연산자를 사용합니다. 그것은 특정 todo의 ID를 받는 `onTodoClick` 이라는 온클릭 함수를 정의합니다.

`Todo` 컴포넌트는 위에서 정의되었습니다. 프레젠테이셔널 컴포넌트이며, 행동(동작)을 지정하지 않습니다. list item이 클릭되었을 때, 그것은 온클릭 핸들러를 호출합니다. 프레젠테이셔널 컴포넌트로서 그것은 컴포넌트가 각기 다른 환경에서 어떻게 보여져야 하는 지를 지정합니다. 이 예제에서, todo item의 다른 두가지 스타일을 선택하기 위해 `completed` prop을 사용합니다.

`TodoList` 또한 프레젠테이셔널 컴포넌트입니다. 이것은 `onTodoClick` prop에 클릭 핸들링을 위임합니다. 이는 클릭된 todo의 ID를 넘겨줍니다.

마침대, `TodoApp` 컴포넌트는 클릭된 todo의 ID와 `TOGGLE_TODO` 타입의 액션을 디스패치합니다. 스토어는 리듀서를 호출하고, 애플리케이션의 상태를 업데이트하고, 새로운 todos와 함께 `TodoApp` 컴포넌트를 리렌더링 할 것입니다.

`Footer` 컴포넌트는 현재의 `visibilityFilter`를 prop으로 받고, 현재의 필터를 세팅하는 `onFilterClick` 콜백도 받습니다. `Footer` 컴포넌트는 세 개의 `FilterLink`들을 렌더링하고, 그것들의 각각의 필터값들과 온클릭 핸들러와 현재의 visibility filter를 넘겨줍니다.

`FilterLink` 컴포넌트는 그것들이 클릭되었을 때 무슨일이 일어나는지에 대해 모르는 프레젠테이셔널 컴포넌트가 되어야 합니다. 그래서 그것은 온클릭 콜백을 호출하고, 각각의 링크들마다 각기 다른 필터를 인자로 넘겨줍니다. `Footer` 는 필터 링크의 클릭 핸들링을 자신의 prop인 `onFilterClick`에 위임합니다.

마침내, `TodoApp` 컴포넌트는 우리의 앱에서 필터 링크들을 클릭했을 때 visibility filter와 new filter를 셋팅하는 타입의 액션을 디스패치하는 등의 동작을 정의하는 컨테이너 컴포넌트가 되었습니다.

프레젠테이셔널 컴포넌트의 분리는 리덕스에서 반드시 요구되는 것은 아닙니다. 하지만 저는 이러한 패턴이 렌더링을 리덕스로부터 분리하기 때문에 추천합니다. 따라서, 만약 이후에 당신의 프로젝트를 `Relay` 같은 다른 프레임워크로 옮길 때, 프레젠테이셔널 컴포넌트를 거의 똑같이 유지할 수 있기 때문에 당신의 컴포넌트들을 바꾸지 않아도 됩니다.

이러한 접근은 콜백들을 포함하는 리스트 컴포넌트들로부터 그것들을 가져오는 컴포넌트들을 통해 많은 prop 들을 엮어내야 한다는 단점도 갖고 있습니다. 이러한 문제는 다음 강의에서 살펴볼 많은 중계(중간) 컨테이너 컴포넌트들을 도입함으로써 쉽게 해결될 수 있습니다.