# Todo List Example (Before Refactored)

```jsx
// 실제 todo-item의 변화를 만들어내는 리듀서
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

// 전체 todos 액션을 관리하는 리듀서
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

// 현재 보여지는 필터 상태를 바꿔주는 리듀서
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter; // 필터값(문자열)을 리턴한다.
    default:
      return state;
  }
};

const { combineReducers } = Redux;

// todos 리듀서와 visibilityFilter 리듀서를 합친 리듀서 생성
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

// 리덕스로부터 createStore 메서드 import
const { createStore } = Redux;

// todoApp 리듀서를 인자로 받아서 store를 생성
const store = createStore(todoApp);

// 리액트 컴포넌트 import
const { Component } = React;

// FilterLink 컴포넌트 정의
// 각각의 필터와 현재 선택된 필터, 그리고 텍스트 렌더링을 위한 children을 props로 받는다.
const FilterLink = ({ filter, currentFilter, children }) => {
  // 현재 선택된 필터와 해당 컴포넌트의 필터가 일치할 경우 a tag가 아닌 span tag로 렌더링
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  // 필터 선택을 위해 a tag로 렌더링한다.
  return (
    <a
      href='#'
      // 클릭 시 스토어에 필터 세팅 액션을 디스패치한다.
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
      }}>
      {children}
    </a>
  );
};

// 필터에 따라 보여지는 todos를 바꿔주는 메서드
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

// todo-item id값 관리를 위한 전역변수 설정
let nextTodoId = 0;

// 메인이 되는 TodoApp 컴포넌트 선언
class TodoApp extends Component {
  render() {
    // 넘어온 props를 분해할당한다.
    const { todos, visibilityFilter } = this.props;

    // todos와 필터를 인자로 넣어서 현재 보여져야하는 todos를 만든다.
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    // JSX 렌더링
    return (
      <div>
        {/* ref를 이용해서 input 엘리먼트를 this.input으로 지정해준다. */}
        <input
          ref={node => {
            this.input = node;
          }}
        />

        {/* 버튼을 클릭하면 ADD_TODO 타입의 액션을 디스패치한다. */}
        <button
          onClick={() => {
            // 버튼이 클릭될 때 마다 스토어에 액션을 디스패치 해준다.
            // text 값은 ref로 지정된 input 엘리먼트에 입력된 값을 넘겨주고,
            // id는 전역변수 nextTodoId를 하나씩 늘려나간다.
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            });

            // 액션을 디스패치 하고난 뒤에는 값이 입력된 input 엘리먼트를 비워준다.
            this.input.value = '';
          }}>
          Add Todo
        </button>

        {/* todos가 렌더링 되는 리스트 부분 */}
        <ul>
          {/* 현재 보여져야하는 visibleTodos 배열을 map으로 순회하면서 하나씩 렌더링한다. */}
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}>
              {todo.text}
            </li>
          ))}
        </ul>

        {/* 어떤 필터를 선택할지 고르는 부분 */}
        <p>
          Show:{' '}
          {/* FilterLink 컴포넌트에 각각의 filter와 currentFilter를 props로 넘긴다. */}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>
            All
          </FilterLink>
          {', '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {', '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

// render() 함수를 만들고, 그 안에서 ReactDOM에 렌더링 한다.
// subscribe를 위한 listener로 기능한다.
const render = () => {
  ReactDOM.render(
    // TodoApp 컴포넌트 렌더링하면서 props로 todos 상태와 visibilityFilter 상태를 내려준다.
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

// render 함수를 리스너로 받아서 스토어에서 구독한다.
// 액션을 디스패치 해서 스토어에 변화가 발생할 때마다 리스너인 render 함수가 호출된다.
store.subscribe(render);

// 초기 렌더링을 위한 render 함수 호출
render();
```

