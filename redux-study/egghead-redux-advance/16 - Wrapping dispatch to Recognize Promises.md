# 16. Promise 알아보기 위해 `dispatch` 감싸기

`receiveTodos` 액션 크리에이터 그 자체로는 그다지 유용하지 않습니다. 우리가 호출할 때마다, 원하는 것은 todos 를 먼저 가지고 오는 것이기 때문입니다. `fetchTodos`와 `receiveTodos`는 동일한 인수를 받아들이므로, 이 코드를 하나의 액션 크리에이터로 그룹화 할 수 있다면 좋을 것입니다.

**VisibleTodoList 내의 기존 fetchData()**

```js
fetchData() {
  const { filter, receiveTodos } = this.props;
  fetchTodos(filter).then(todos =>
    receiveTodos(filter, todos)
  );
}
```

### 액션 크리에이터 리팩토링 하기

가짜 API 를 액션 크리에이터 파일 (src/actions/index.js)에 가져 와서 시작하겠습니다.

`import * as api from '../api'`

이제 우리는 fetchTodos 라는 비동기 액션 크리에이터를 추가 할 것입니다. 인수로 `filter` 를 받은 다음, 그것으로 API 의 fetchTodos 메서드를 호출합니다.

Promise 의 `then` 메서드를 사용하여 `response`의 Promise 의 결과를 `filter`와 `response`가 주어진 receiveTodos 에 의해 생성된 액션 객체로 바꿉니다.

**src / actions / index.js 내부**

```js
export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));
```

receiveTodos 는 동기적으로 액션 객체를 환하지만, fetchTodos 는 액션 객체를 통해 resolve 되는 Promise 를 반환합니다.

이제 우리는 액션 크리에이터로부터 receiveTodos 를 내보내는 것을 멈출 수 있습니다. 왜냐하면 우리는 컴포넌트를 변경하여 fetchTodos 를 직접 사용할 수 있기 때문입니다.

### VisibleTodoList 업데이트 하기

컴포넌트 파일로 돌아가서, `connect`에 의해 삽입된 fetchTodos prop 을 사용할 수 있습니다. 이것은 방금 작성한 새로운 비동기 fetchTodos 액션 크리에이터에 해당합니다.

지금부터 우리는 fetchTodos 액션 크리에이터를 사용할 것이기 때문에, `import {fetchTodos} from '../api'`를 제거할 수 있습니다. 이 액션은 `connect` 에 의해 prop 으로 주입됩니다.

```js
fetchData () {
  const {filter, fetchTodos} = this.props;
  fetchTodos (filter);
}
```

### 요약

fetchTodos 액션 크리에이터는 API 에서 fetchTodos 함수를 호출하지만, 그 결과를 receiveTodos 에 의해 생성된 Redux 액션으로 변환합니다.

그러나 기본적으로 Redux 는 Promises 가 아닌 일반 객체를 디스패치하는 것만 허용합니다. 우리는 configureStore.js 내부에서 addLoggingToDispatch ()와 동일한 트릭을 사용하여 Promises 를 인식하도록 알려줄 수 있습니다. (addLoggingToDispatch 함수는 스토어에서 `dispatch`를 ​​ 가져와서 모든 액션과 상태를 기록하는 새로운 버전의 `dispatch`를 ​​ 반환한다는 점을 상기하세요).

### Promise 지원 추가

configureStore.js 내부에서 스토어를 가져와 Promise 을 지원하는 `dispatch`의 버전을 반환하는 addPromiseSupport() 함수를 생성합니다.

먼저 스토어에서 정의된 rawDispatch 함수를 가져옵니다. 디스패치 함수와 동일한 API 를 가진 함수를 반환합니다. 즉, 액션을 받습니다.

```js
const addPromiseSupportToDispatch = store => {
  const rawDispatch = store.dispatch;
  return action => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};
```

액션이 실제 액션인지 또는 promise 인지는 알 수 없기 때문에 함수인 `then` 메소드가 있는지 확인합니다. 그렇다면 우리는 그것이 promise 이라는 것을 압니다. 액션이 promise 인 경우 `rawDispatch`를 통해 내려온 액션 객체를 resolve 할 때까지 기다립니다.

그렇지 않으면, 우리는 우리가 받은 액션 객체로 바로 `rawDispatch`를 호출할 수 있습니다.

새로운 `addPromiseSupportToDispatch` 함수를 사용하면 액션과 액션으로 resolve 할 수 있는 promise 을 모두 전달할 수 있습니다.

끝내려면 새 기능을 한 번 더 호출해야만 스토어가 App 으로 반환됩니다.

```js
//`configureStore.js`의 맨 아래에
const configureStore = () => {
  const store = createStore (todoApp);

if (process.env.NODE_ENV! == 'production') {
    store.dispatch = addLoggingToDispatch (store);
  }

store.dispatch = addPromiseSupportToDispatch (store);

return store;
};
```

지금 앱을 실행하면, 응답 준비가 되었을 때 `'RECEIVE_TODOS'` 액션이 디스패치되는 것을 확인할 수 있습니다. 그러나 컴포넌트는 비동기 액션 크리에이터에서 비동기 로직을 캡슐화하는 보다 편리한 API 를 사용합니다.

### 순서는 중요합니다

configureStore 내부의 디스패치 함수를 재정의하는 순서가 중요하다는 것을 기억하십시오.

`addLoggingToDispatch` 전에 `addPromiseSupportToDispatch` 를 호출하도록 변경하면 액션이 먼저 출력되고 promise 가 처리됩니다.

이렇게 하면 우리에게 `undefined`라는 액션 타입이 생기고 액션 대신 Promise 가 표시됩니다. 이는 그리 유용하지 않습니다.