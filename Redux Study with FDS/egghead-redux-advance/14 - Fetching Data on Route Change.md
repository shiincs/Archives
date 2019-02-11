# 14. Fetching Data on Route Change (라우트 변화시 데이터 수신)

시작하기에 앞서, 우리는 진입점인 `index.js`에서의 `fetchTodos` 테스트 API 호출을 제거할 것입니다. 왜냐하면 todos를 `VisibleTodoList` 컴포넌트 내부로부터 수신하기를 원하기 때문입니다.

`fetchTodos`를 `VisibleTodoList.js`에 import 함으로써 시작하겠습니다.

`import { fetchTodos } from '../api';`

`VisibleTodoList` 컴포넌트는 각각 props를 주입하는 중간 컴포넌트를 생성하는 `connect`와 `withRouter`에 의해 생성되었습니다.

`fetchTodos` API를 호출하는 가장 좋은 위치는 `componentDidMount()` 라이프사이클 훅 내부일 것입니다. 그러나, 생성된 컴포넌트들의 라이프사이클 훅을 오버라이드할 수 없습니다! 이는 새로운 리액트 컴포넌트를 만들어야 함을 의미합니다.

#### Creating a New React Component

`VisibleTodoList.js` 내부에서, 리액트로부터 `React`와 `Component` 기본 클래스를 import할 것입니다. 그 다음 기본 컴포넌트 클래스를 확장하는 `VisibleTodoList`라고 불리는 리액트 컴포넌트 클래스를 선언할 것입니다.

```jsx
import React, { Component } from 'react';
// other imports...

class VisibleTodoList extends Component {
  render() {
    return <TodoList {...this.props} />;
  }
}
.
.
.
```

여전히 우리는 이전과 똑같이 `TodoList` 프레젠테이셔널 컴포넌트가 렌더링되기를 원합니다. 이러한 새로운 클래스를 추가하는 단 하나의 목적은 라이프사이클 훅을 추가하기 위해서입니다. 어떠한 props던지 `TodoList`에 전달될 것입니다.

이제 `VisibleTodoList`는 위 처럼 클래스로 정의되었고, 우리는 더이상 그와 같은 이름의 다른 상수(변수)를 선언할 수 없습니다. 그래서 감싸진 컴포넌트에 바인딩 되는 `VisibleTodoList`를 재할당합니다. 또한 새로운 클래스를 감싸기 위한 `connect()` 호출을 바꿀 것입니다.

```jsx
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodoList));

export default VisibleTodoList;
```

`connect()` 호출에 의해 생성된 컴포넌트는 우리가 정의한 `VisibleTodoList` 클래스를 랜더링할 것입니다. `connect`와 `withRouter` 로 감싸는 호출들의 결과는 최종적으로 파일에서 export 하는 `VisibleTodoList` 컴포넌트 입니다.

#### Adding Lifecycle Hooks

우리는 컴포넌트가 마운트될 때 현재의 필터에 대한 todos를 수신하기를 원합니다.

필터를 직접 prop으로 사용할 수 있게 된다면 매우 편리할 것입니다. 그래서 예전처럼 `params`로부터 `filter`를 계산하는 `mapStateToProps`를 바꿉니다. 그러나 우리는 그것을 `return` 객체의 프로퍼티(속성)들 중 하나로도 전달할 것입니다. 따라서 이제 우리는 `todos`와 `filter` 모두를 `VisibleTodoList` 컴포넌트 자체의 내부에서 가져올 것입니다.

##### Updating `mapStateToProps` (before react-router v4.0.0)

```jsx
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};
```

##### Updating `mapStateToProps` (react-router v4.0.0 or superior)

```jsx
const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};
```

라이프사이클 메서드로 돌아가서, 우리는 `componentDidMount` 내부에서 `this.props.filter`를 사용할 수 있습니다. todos가 수신되었을 때, `fetchTodos`는 프로미스를 리턴합니다. 우리는 귀결된 `todos`에 접근하기 위해 `then` 메서드를 사용할 수 있고, 가짜 백엔드로부터 받은 현재의 `filter`와 `todos`를 기록(로깅)할 수 있습니다.

##### Implementing `componentDidMount`

```jsx
class VisibleTodoList extends Component {
  componentDidMount() {
  	fetchTodos(this.props.filter).then(todos => 
      console.log(this.props.filter, todos);
    );
  }
}
```

현재 코드로 앱을 실행하면 `all` 필터와 그에 따른 `todos`가 보여질 것입니다.

그러나, 필터가 변경될 때 어떤 일도 일어나지 않습니다. 왜냐하면, `componentDidMount`는 오직 한번만 실행되기 때문입니다. 이를 고치기 위해, `componentDidUpdate`라고 불리우는 두번째 라이프사이클 훅을 추가해줘야 합니다.

##### Implementing `componentDidUpdate`

```jsx
// inside the `VisibleTodoList` below `componentDidMount()`
componentDidUpdate(prevProps) {
  if(this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos => 
      	console.log(this.props.filter, todos); 
      );
  }
}
```

`componentDidUpdate` 는 이전의 props를 인자로 받습니다. 그래서 우리는 현재와 이전의 필터값들을 비교할 수 있습니다. 만약 현재 필터가 이전 필터와 다르다면, 현재 필터에 대해 `fetchTodos()`를 호출합니다.