# 08. withRouter()를 이용해 연결된 컴포넌트에 Params 주입하기

우리는 라우터 또는 App 컴포넌트내에서 전달된 params.filter 를 읽을 수 있습니다. 라우터는 모든 라우트 핸들러 컴포넌트에 params prop 를 주입하기 때문에 거기에서 params 에 액세스 할 수 있습니다. 이 경우, `:filter` 는 params 내부로 전달됩니다.

```js
// Root.js
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={broswerHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

// App.js
const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={parms.filter || 'all'} />
    <Footer />
  </div>
);
```

그러나 App 컴포넌트자체는 실제로 `filter`를 사용하지 않고, 단지 `filter`를 VisibleTodoList 로 전달해서 현재 visible 한 `todos`를 계산하는 데 사용합니다. 라우트 핸들러 가장 윗단에서부터 params 를 전달하는 일은 귀찮은 일이므로 `filter` prop 을 제거합니다. 대신, VisibleTodoList 자체에서 현재 라우터 params 를 읽는 방법을 찾아야 합니다.

```js
App.js;

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
```

`react-router` 패키지에서 `withRouter` 라는 새 import 를 추가합니다. Redux 와 잘 작동하려면 적어도 React Router 3.0 이상을 사용하는 것이 중요합니다. withRouter 에서는 리액트 컴포넌트를 받아들여서 params 등 라우터 관련 prop 을 컴포넌트에 주입하는 또다른 리액트 컴포넌트를 반환합니다.

```js
//VisibleTodoList.js

import { withRouter } from 'react-router';
```

params 를 mapStateToProps 내에서 사용할 수 있게 하려면 `connect`로 결과값을 래핑하면 됩니다. connect 된 컴포넌트는 params 를 prop 으로 가져올 수 있습니다.

```js
// VisibleTodoList.js

const VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
);
```

`mapStateToProps` 함수로 스크롤을 조금 올려서 내용을 변경하여, `ownProps`에서 직접 `filter`를 읽는 대신 `ownProps.params`를 통해 내용을 읽습니다.

```js
const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.params.filter),
});
```

마지막으로 App 컴포넌트에서 했던 것처럼 대체할 수 있는(fallback) 값을 지정합니다. 더 줄여쓰기 위해서 ES6 의 분해대입 구문을 이용하여 인수 정의 내부에 바로 params 를 읽어옵니다.

```js
// VisibleTodoList.js

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});
```

connect 된 컴포넌트의 `mapStateToProps` 함수 내에서 라우터 params 를 사용 가능하게 만들어 봤는데, 이를 한번 되짚어 봅시다. 부모 컴포넌트에서 전달된 prop 에 대응하는 `ownProps` 인수에서 params 를 읽습니다. params prop 은 `withRouter` 호출에 의해 생성된 컴포넌트를 통해 전달됩니다. 이것이 connect 된 컴포넌트의 prop 으로 이어집니다.

```js
// VisibleTodoList.js

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});
```

withRouter 는 그 자체로 모든 prop 을 전달하므로, ownProps 인수에서 params 와 전달된 prop 들을 보게 됩니다. 마지막으로, React Router 패키지에서 withRouter 를 import 해옵니다.

```js
// VisibleTodoList.js
const VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
);

// VisibleTodoList.js
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
```

withRouter 에 의해 주입된 params 는 기본적으로 라우트 핸들러 컴포넌트에 주입되는 정확히 동일한 params 입니다. params 를 가져오는 두 가지 방법을 모두 사용할 수도 있고 심지어 둘 다 한꺼번에 사용할 수도 있지만, withRouter 는 현재 컴포넌트 트리 중 깊은 어딘가에서 현재 params 를 읽어야 할 때 편리합니다.

### 참고: React Router v4 에서의 match

React Router v4 에서는 `match`를 통해서도 filter prop 에 접근 가능하다.

```js
const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => ({
  todos: getVisibleTodos(state.todos, filter || 'all'),
});
```