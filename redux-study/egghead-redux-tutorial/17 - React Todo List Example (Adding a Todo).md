# 17. React Todo List Example (Adding a Todo)

Todo App의 기존 리덕스 코드는 아래와 같습니다.

```js
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
```

그럼 이제 Todo App을 화면에 띄워보기 위해 리액트와 연결시켜보겠습니다.

우선 리액트 컴포넌트가 렌더링 될 HTML 파일 내용은 아래와 같습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    /* redux cdn */
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.0.4/redux.js"></script>
    /* react cdn */
    <script src="https://fb.me/react-0.14.0.js"></script>
    /* react-dom cdn */
    <script src="https://fb.me/react-dom-0.14.0.js"></script>
  </head>

  <body>
    /* 리액트 컴포넌트가 렌더링되는 root node 입니다. */
    <div id="root"></div>
  </body>
</html>
```

리액트 컴포넌트의 내용은 아래와 같습니다.

```jsx
const { Component } = React;

// 개별 todo-item 의 id를 정해주기 위한 전역변수 선언
let nextTodoId = 0;

// TodoApp 컴포넌트 선언
class TodoApp extends Component {
  render() {
    return (
      <div>
        {/* ref를 이용해서 input 엘리먼트를 this.input으로 지정해준다. */}
        <input
          ref={node => {
            this.input = node;
          }}
        />
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
		{/* TodoApp 컴포넌트의 props로 넘어온 todos를 map으로 순회하면서 하나씩 list-item을 렌더링한다. */}
        <ul>
          {this.props.todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// TodoApp 컴포넌트를 렌더링하는 render 함수
const render = () => {
  ReactDOM.render(
    // 스토어의 현재 상태를 가져와서 todos 배열을 props로 넘겨준다.
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('root')
  );
};

// 스토어에서 render 함수를 구독한다.
// 액션을 디스패치 해서 스토어에 변화가 발생할 때마다 render 함수가 호출된다.
store.subscribe(render);

// 초기(맨 처음) 렌더링을 위한 render 함수 호출
render();
```



### (정리) 앱이 동작하는 원리

우선 `TodoApp` 컴포넌트에서부터 시작합니다. 이 컴포넌트는`todos`가 어떻게 추가되는지에 대해 알지 못합니다. 이 컴포넌트가 할 수 있는 것은 `ADD_TODO` 타입의 액션을 디스패치해서 상태를 바꾸는 것 뿐입니다.

todo item 에 text가 추가되는 것은 input 엘리먼트로부터 발생하고, todo item의 id는 item이 추가되면서 동시에 증가됩니다.

리덕스 앱에서 리액트 컴포넌트의 액션을 디스패치 하는 것은 일반적이지만, 현재 상태를 렌더링 할 수 있는 것도 중요합니다.

`TodoApp` 컴포넌트는 `todos`를 prop 으로 받을 것이라고 가정을 하고 있고, 그것을 map 으로 순회해서 list의 item으로 렌더링 합니다. (todo-item의 id를 key로 사용합니다.)

`TodoApp` 컴포넌트는 상태가 변화하거나(앱이 초기화될 때) 마다 동작하는 `render()` 함수 안에서 렌더링 됩니다. `render()` 함수는 스토어의 현재 상태를 나타내고, `todos` 배열을 `TodoApp` 컴포넌트에 넘겨줍니다. (`<TodoApp todos={store.getState().todos} />`  코드에서 넘겨줍니다.) 

`render()` 함수는 스토어의 상태가 변할 때마다 호출되기 때문에 `todos` prop은 항상 최신 상태를 유지합니다.



### (정리) 리덕스에서 변화가 동작하는 원리

모든 상태의 변화는 컴포넌트의 어딘가에서의 `store.dispatch()` 호출 때문에 발생합니다.

액션이 디스패치될 때, 스토어는 현재의 상태와 디스패치된 액션에 의해 생성된 리듀서를 호출합니다. 이 예제에서는 `const todoApp = combineReducers({ todos, visibilityFilter });` 코드에 의해 생겨난  `todoApp` 리듀서를 말합니다.

우리 예제에서, `ADD_TODO` 액션 타입은 `todos()` 리듀서의 스위치 구문과 매치되고, 그 안에서 자식인 `todo()` 리듀서가 호출됩니다.  `todo()` 자식 리듀서는 `undefined(새 todo에는 상태가 없기 때문에)`와 `ADD_TODO` 액션을 전달받습니다.

`todo()` 자식 리듀서 안에도 비슷한 스위치 구문이 있습니다. `ADD_TODO`가 매치되기 때문에 리듀서는 todo item의 초기 상태를 리턴합니다. (id는 nextTodoID++ 로부터, text는 input 엘리먼트로부터, completed는 false로 초기화)

자식인 `todo()` 리듀서를 호출한 `todos()` 리듀서는 기존의 item과 새롭게 생성된 item이 추가된 새로운 배열을 리턴합니다. (ES6의 펼침 연산자 이용)

이제 병합된 `todoApp` 리듀서는 이 새로운 `todos` 배열을 새로운 값으로 받아서 `전역 상태 객체`의 `todos` 값을 바꿉니다. 그래서 새롭게 추가된 todo item에 해당하는 새로운 `상태 객체`를 리턴합니다.

`todoApp` 리듀서는 이 앱의 root 리듀서이고, 스토어에는 이 리듀서 하나만 존재하기 때문에 이 리듀서의 다음 상태가 리덕스 스토어의 다음 상태가 되고, 모든 리스너들이 알게 됩니다.

`render()` 함수는 스토어의 변화를 구독하기 때문에, 다시 호출되면서 `store.getState()`를 통해 새로운 상태를 가져오고, 업데이트된 `todos`를 `TodoApp` 컴포넌트에 prop 으로 넘겨줍니다.

이러한 사이클이 반복됩니다.