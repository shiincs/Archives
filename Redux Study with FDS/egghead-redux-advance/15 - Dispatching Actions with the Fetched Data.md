# 15. 페치된 데이터를 가지고 액션 디스패치 하기

데이터를 가져온 후에 Redux 액션을 전달하는 방법을 배우고, 라우터가 변경될 때는 어떻게 하면 좋은지를 다시 설명합니다.

라이프사이클 훅 사이에 공통된 코드를 별도의 메서드로 추출 할 수 있습니다. 이를 fetchData 라고 부릅시다. 여기서 가져올 데이터는 filter 에만 의존합니다.

초기 데이터를 가져 오기 위해, componentDidMount() 훅에서 이 메소드를 호출합니다. 또한 filter 가 componentDidUpdate() 훅 내에서 변경 될 때마다 호출합니다.

**VisibleTodoList.js**

```js
class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
  .
  .
  .
```

### fetchData() 업데이트 하기

가져온 todos 가 Redux store 의 상태가 되기를 원합니다. 어떤 것을 상태로 가져 오는 유일한 방법은 액션을 전달하는 것입니다.

우리는 방금 가져온 todos 를 콜백 prop 인 receiveTodos 라고 부릅니다.

```js
fetchData() {
  fetchTodos(this.props.filter).then(todos =>
    this.props.receiveTodos(todos)
  );
}
```

컴포넌트 내에서 사용할 수 있게 하려면, receiveTodos 라는 함수를 전달해야 합니다. 이 함수는 `connect`의 두 번째 인수 안에서 액션 크리에이터가 됩니다. 함수의 이름이 콜백 prop 의 이름과 일치하기 때문에, ES6 Object 속성 표기법을 사용해서 더 짧게 작성할 수 있습니다.

다른 모든 액션 크리에이터가 정의된 파일에서 receiveTodos 를 import 해옵니다.

```js
// At the top of `VisibleTodoList.js`
import { toggleTodo, receiveTodos } from '../actions'

...

// At the bottom of `VisibleTodoList.js`
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo, receiveTodos }
)(VisibleTodoList))
```

### receiveTodos 구현하기

이제 실제로 receiveTodos 를 구현해야 합니다.

액션 크리에이터 파일 (src/actions/index.js) 안에는 서버 `response`를 인수로 하고, 'RECEIVE_TODOS'의 `type`과 및 `response`를 필드로 가지는 객체를 반환하는 `receiveTodos` 함수의 새 export 를 만듭니다.

**src/actions/index.js 내부**

```js
export const receiveTodos = response => ({
  type: 'RECEIVE_TODOS',
  response,
});
```

이 액션을 처리하는 리듀서는 응답과 같은 것이 어떤 filter 인지를 알아야 하므로, `receiveTodos` 액션 크리에이터에 인수로 `filter`를 추가하고 이를 액션 객체의 일부로 전달합니다.

```js
export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});
```

### `filter`를 사용하여 VisibleTodoList 컴포넌트 업데이트 하기

`VisibleTodoList`로 돌아가서, `fetchData`를 업데이트하여 액션 크리에이터를 통해 필터를 전달합니다.

ES6 분해대입 구문을 사용하면 `prop`으로부터 `filter`와 `receiveTodos`를 바로 가져올 수 있습니다. `filter`를 바로 분해대입할 수 있는 것은 매우 중요한데, 콜백이 실행되었을 때 사용자가 페이지를 닫아서 `this.props.filter`가 아마도 변경되었을 수 있기 때문입니다.

**Inside VisibleTodoList**

```js
fetchData() {
  const { filter, receiveTodos } = this.props;
  fetchTodos(filter).then(todos =>
    receiveTodos(filter, todos)
  );
}
```

### 보일러플레이트 덜 사용하기

앱을 사용하면서, 컴포넌트는 데이터가 준비되면 라이프사이클 훅에서 데이터를 가져 와서 Redux 액션을 디스패치합니다. 이제 보일러플레이트를 더 적게 작성해 보겠습니다.

named import 를 namespace import 로 바꿀 수 있습니다. 즉, 액션이 있는 파일에서 내보낸 모든 함수는 actions 라는 객체에 있으며, 이 객체는 `connect`의 두 번째 인수로 전달됩니다.

```js
// At the top of `VisibleTodoList`

// Before: import { toggleTodo, receiveTodos } from '../actions'
import * as actions from '../actions' // After
.
.
.
// At the bottom of `VisibleTodoList`
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // Before: { onTodoClick: toggleTodo, receiveTodos}
  actions // After
)(VisibleTodoList))
```

VisibleTodoList 의 render() 함수 내부에서 prop 을 분해대입합니다. toggleTodo 액션 크리에이터가 onTodoClick prop 이름을 전달하되, 나머지 prop 은 그대로 전달 될 수 있기 때문입니다.

...rest 객체는 이제 toggleTodo 이외의 모든 prop 이 들어 있으므로, 그대로 내려보낼 것입니다. TodoList 컴포넌트가 기대하는 바에 따라 toggleTodo 를 onTodoClick prop 으로 전달합니다.

```js
// Inside of `VisibleTodoList`
  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
      />
    );
  }
}
```

