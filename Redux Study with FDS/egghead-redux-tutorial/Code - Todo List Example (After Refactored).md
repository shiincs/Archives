# Todo List Example (After Refactored)

```jsx
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

// Link 컴포넌트는 부모 컴포넌트인 FilterLink에서 props를 받아서 렌더링되는 PC
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick(); // props로 받아온 온클릭 핸들러를 호출한다. (시작점)
      }}>
      {children}
    </a>
  );
};

// 필터의 동작 부분은 담당하는 CC
class FilterLink extends Component {
  // 여기에서도 store를 구독해서 변화가 발생하면 강제로 컴포넌트를 업데이트해서 리렌더링한다.
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  // 컴포넌트가 언마운트될 때 구독을 해제한다.
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        // 해당 컴포넌트의 props로 넘어온 필터와 현재 스토어에 저장된 상태의 보여지는 필터가 같을 경우 true 리턴
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          })
        }>
        {props.children}
      </Link>
    );
  }
}

// FilterLink CC를 모아서 렌더링하면서 props를 넘겨주기 위한 중간 PC
const Footer = () => (
  <p>
    <FilterLink filter='SHOW_ALL'>All</FilterLink>
    {', '}
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {', '}
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
);

// 타고 내려온 props를 받아서 최종적으로 todo-item을 렌더링하는 PC
// onClick 이벤트 핸들러의 시작지점
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    {text}
  </li>
);

// todos props를 받아서 todo PC에 props를 내려주는 PC (중간 PC)
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

// input 엘리먼트와 button 엘리먼트를 렌더링하면서 동작도 정의하는 CC + PC
const AddTodo = () => {
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value,
          });
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  );
};

// 리팩토링 전과 같은 코드, 필터 prop에 따라 각기 다른 todos 배열을 리턴한다.
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

// 현재 보여지는 TodoList의 동작을 관리하는 CC
class VisibleTodoList extends Component {
  // store에 변화가 발생할 때마다 이 컴포넌트를 강제로 업데이트 하면서 리렌더링 한다.
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  // 컴포넌트가 언마운트 될때마다 구독을 해제해준다.
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    // 이건 왜 있는 코드인지...?
    const props = this.props;

    // 상태를 가져와서 가공한 뒤 하위 컴포넌트에 props로 넘겨준다.
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
      />
    );
  }
}

let nextTodoId = 0;
// 기존의 TodoApp에서는 동작과 렌더링을 전부 관리했지만,
// 리팩토링된 TodoApp 에서는 위에서 정의한 CC들을 렌더링하는 것이 끝이다.
const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
};

// 기존에는 최상위 컴포넌트인 TodoApp 에서 스토어의 상태를 props로 내려줬지만,
// 이제 스토어의 상태를 하위 컴포넌트에서 각자 가져오기 때문에 props를 내려주지 않는다.
ReactDOM.render(<TodoApp />, document.getElementById('root'));

// 또한, 기존 코드에서는 render() 함수 선언부 안에서 ReactDOM.render()를 호출했는데,
// 이제는 하위 컴포넌트에서 forceUpdate()로 스토어의 변화 발생 시 자체적으로 리렌더링 하기 때문에
// 최상위 컴포넌트인 TodoApp을 구독해서 전체 애플리케이션을 리렌더링하는 기존의 비효율적인 방식을 제거했다.
```

