#Redux: Store Methods: getState(), dispatch(), and subscribe()

Redux Store에 대해 배우고 세 가지 방법으로 카운터 애플리케이션을 구현합니다.

## Transcript

00:00 Redux를 CDN를 추가했습니다. Redux라는 단일 전역 변수를 내 보냅니다. 실제 응용 프로그램에서는 NPM 대신 webpack 또는 Browserify와 같은 모듈 번들을 사용하는 것이 좋지만 현재는 이 예제로 충분합니다.

0:27 Redux에서 createStore 라는 함수 하나만 필요합니다. 여기서 ES6 분해대입을 사용하고 있습니다. 그것은 `var store = Redux.createStore`를 작성하는 것과 같습니다. 또는 NPM을 사용하고 Babel과 같은 ES6을 사용하는 경우 `import {createStore} from 'redux';`와 같이 표시됩니다.

0시 58분 이 store는 Redux의 세 가지 원칙을 함께 결합합니다. 현재 어플리케이션은 객체인 상태를 보유하고 있습니다. 이것은 액션을 dispatch 할 수 있습니다. store를 생성 할 때 state를 action으로 갱신하는 방법을 알려주는 reducer를 지정해야합니다.

01:16 이 예제에서는 상태 업데이트를 관리하는 reducer로 counter를 사용하여 store를 작성합니다. 이 일은 세 가지 중요한 방법이 있습니다.

01:28 이 작업의 첫 번째 방법은 `getState()`라고합니다. Redux의 현재 상태를 가져옵니다. 작업을 수행했다면 우리 어플리케이션의 초기 상태인 0을 보게됩니다.

01:44 두 번째이며 가장 일반적으로 사용되는 store 메서드는 `dispatch`입니다. 그것은 당신이 어플리케이션 상태를 변경하는 작업을 `dispatch`하게합니다. dispatch 후 state를 기록하면, 우리는 그것이 바뀌 었음을 볼 것입니다.

01:59 물론, 콘솔로그는 지루해지기 때문에, redux store method의 도움을 받아 무언가를 렌더링하려 합니다. 이 기능을 사용하면 작업이 dispatch 될 때마다 Redux 작업이 호출하는 콜백을 등록 할 수 있으므로 응용 프로그램의 UI를 업데이트 할 수 있습니다. 현재 응용 프로그램 상태를 반영합니다.

02:23 나는 React 뿐 아니라 어떤것도 사용하고 있지 않습니다. 난 그냥 카운터를 문서 본문에 렌더링하려고합니다. 본문을 클릭 할 때마다이 카운터를 증가시키기위한 작업을 전달할 것입니다.

02:37 주의를 기울이면 초기 state 인 0이 렌더링되지 않은 것을 알 수 있습니다. subscribe callback 내부에서 렌더링하기 때문에 이것은 실제로 처음에는 실행되지 않습니다.

02:51 그래서 이 logic을 render 메서드로 추출합니다. 이 작업에 렌더링 메소드를 등록합니다. 초기 상태를 렌더링하기 위해 한 번 호출합니다. 이제는 0으로 렌더링되고 클릭은 카운터를 증가시킵니다. 이것이 Redux 응용 프로그램의 첫 번째 작업입니다.

## createStore 생성자(?) 메소드(?)를 통해 생성된 store 는 어떻게 생겼을까?

```js
const { createStore } = require("redux");

const store = createStore(counter);

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

```
{ dispatch: [Function: a],
  subscribe: [Function: f],
  getState: [Function: u],
  replaceReducer: [Function: c],
  [Symbol(observable)]: [Function: s] }
```

이 단락에서 배울 `dispatch`,`subscribe`,`getState`가 들어있는 것을 확인 할 수 있다.

그냥 한번 실행시켜보자.

```bash
   store.getState();
=> 0

   store.subscribe()
Error: Expected the listener to be a function.
    at Object.f [as subscribe]:1:1783
    at eval:1:7
    at eval
    at new Promise

   store.dispatch()
Error: Actions must be plain objects. Use custom middleware for async actions.
    at Object.a [as dispatch]:1:2481
    at eval:1:7
    at eval
    at new Promise
```

`getState`는 현재 상태를 가져오는 듯 하다.
`subscribe`는 listener 함수가 인자로 필요한 듯 하다.
`dispatch`는 액션은 일반 객체 여야합니다.(인자로 객체타입의 액션을 넘겨야 하는 듯 하다.) 비동기 작업을 위해 맞춤식 미들웨어 사용해야하는듯 하다. 그런데 무슨말인지 모르겠당. 일단 넘어가자

## 전체 예제코드

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.js"></script>
  </head>
  <body></body>
</html>
```

```js
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(counter);

// getState();
// console.log(store.getState());

// store.dispatch({type:'INCREMENT'});
// console.log(store.getState());

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
```
