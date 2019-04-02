# 07. Filtering Redux State with React Router Params

```js
// VisibileTodoList.js
const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter(t => t.complete);
    case "active":
      return todos.filter(t => !t.complete);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibileTodos(state.todos, ownProps.filter)
});
```

_00:00_

현재 `react-router`의 `Link`컴포넌트를 사용하고 있고, 클릭하면 url이 업데이트 된다. 하지만 `visibleTodoList` 컴포넌트의 `mapStateToProps`함수가 아직도 store의 `visibility filter`에 의존하고 있기 때문에, 실제로 할 일 목록들이 업데이트 되고 있지는 않습니다.

_00:20_

`mapStateToProps` 함수에 주번째 인자로 `ownProps`를 추가하고, `ownProps`로 부터 실제로 현재 `visibility filter`가 무엇인지 읽어올 수 있다. 또한 `visibleTodos` 함수가 `all`, `active`, `completed`처럼 filter prop과 같은 표현을 쓰도록 바꾸어 주도록 합니다.

```js
// App.js
const App = ({ match }) => (
  <>
    <AddTodo />
    <VisibleTodoList filter={match.params.filter || "all"} />
    <Footer />
  </>
);
```

_00:40_

VisibleTodoList 컴포넌트는 App으로부터 filter prop을 받아서 mapToStateProps 함수의 인자로 넘겨주기 때문에 App 컴포넌트에 filter 속성을 명시해야 합니다.

_00:53_

우리는 `filter` prop과 현재 경로 param이 일치하기를 바란다. `react router`는 `route handler`컴포넌트에 params라는 특별한 prop을 사용할 수 있게 했기 때문에 prop으로 받은 `params.filter`로부터 url의 `filter param`을 읽을 수 있습니다.

> v 4,0 이상에서는 match.params.filter 와 같은 형식으로 사용합니다.

_01:14_

`param`이 없으면 모든 할 일 목록을 보여주도록 합니다. 이제, app을 새로고침하고 `footer`의 링크를 누르면 url이 업데이트 됨과 동시에 link 버튼이 활성화되고, 할 일 목록도 필터링되어 보여지게 됩니다.

_01:36_

하나의 문제가 있는데, 만약 루트 경로가 아닌 곳에서 새로고침을 하면, 당신의 개발 서버는 정확히 루트경로에만 서비스하도록 설정되어 있을 것입니다.

_01:48_

저는 `express`를 미들웨어로 사용했는데, 어떤 경로가 오더라도 `index.html`을 응답할 수 있도록 설정해야 합니다. 이 방법은 개발 서버가 항상 같은 html파일을 응답할 것이며, `react router`는 클라이언트의 경로와 일치시킬 것입니다.

_02:06_

이제 `visibility filter`는 react router에 의해 관리될 것이며, 더 이상 `visibilityFilter` 리듀서는 필요 없습니다. 삭제하도록 하며, combineReducer 함수에서도 `visibilityFilter`를 삭제해줍니다.

_... 6강과 7강 내용 정리_

_03:40_

당신은 `router`를 통해 `visibility filter`를 제어하는 것이 `single state tree`의 원칙에 모순된다고 생각할 수 있습니다. 하지만 실제로 중요한 것은 어떠한 독립된 데이터 조각(아마 컴포넌트를 말하는듯..) 에도 `single source of truth`가 있다는 점입니다.

_03:56_

우리는 todos를 위한 `the source of truth(진실의 원천)`로써 `redux`를 사용한 것이며, `react router`를 url로부터 계산될 수 있는 진실의 원천으로 사용하고 있습니다. 지금의 경우는 이것이 `visibility filter`입니다.