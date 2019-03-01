# Redux: Implementing Store from Scratch

Redux Store의 합리적인 근사를 20 줄로 작성하는 방법을 배웁니다. 마술은 없다!

## Transcript

00:00 이전 비디오에서는 Redux에서 제공하는 createStore 함수와 반환하는 store 객체를 사용하여 간단한 counter를 구현하는 방법을 살펴 보았습니다.이 객체는 현재 어플리케이션 state를 가져 오는 `getState` method, action을 dispatch 하여 현재 어플리케이션 state를 변경하는 `dispatch` method, 그리고 변경 사항을 subscribe하고 어플리케이션 상태를 다시 렌더링하는 `subscribe` method 를 제공합니다.

00:29 당신이 나를 좋아한다면 당신이 사용하고있는 도구를 이해하는 것을 선호합니다. 이 튜토리얼에서는 Redux가 제공하는 createStore 함수를 처음부터 다시 구현할 것입니다. 지금까지 createStore 함수에 인수로 알았던 유일한 형식은 응용 프로그램에서 제공하는 reducer 함수입니다.

00:52 우리는 store가 현재 상태를 유지 하는 것을 알고 잇습니다. 우리는 이것을 변수로 유지합니다.

```js
const createStore = reducer => {
  let state;
};
```

getState 함수는 그 변수의 현재 state를 반환 할 것입니다.

```js
const createStore = reducer => {
  let state;
  const getState = () => state;
};
```

이 함수는 단일 객체의 dispatch 함수와 subscribe 함수와 결합하여 Redux 저장소라고 부릅니다.

01:14 subscribe 함수는 여러 번 호출 될 수 있으므로, 변경된 모든 리스너를 추적해야합니다. 호출될 때마다 새 listener를 배열에 푸시하려고합니다. action 을 dispatch 하는 것이 state를 변경 할 수 있는 유일한 방법입니다.

01:30 새로운 상태를 계산하기 위해 우리는 현재 state와 action이 전달되는 reducer를 호출합니다. 상태가 업데이트 된 후에는 변경된 모든 linster에게 이를 호출하여 알릴 필요가 있습니다.

```js
const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
};
```

01: 44 여기에 중요한 누락 된 부분이있습니다. listener의 unsubscribe을 제공하지 않았습니다. 전용 Unsubscribe 메서드를 추가하는 대신 Listener 메서드에서이 수신기를 제거하는 함수를 반환합니다.

```js
const subscribe = listener => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
```

02:03 마지막으로 store가 반환 될 때까지 초기 상태가 채워지기를 원했습니다. 우리는 reducer가 초기 값을 반환하도록하기 위해 더미 action을 전달할 것입니다.

```js
dispatch({});
```

02:17 이 경우에 약간의 세부 사항을 제외하고 Redux store의 구현은 createStore가 Redux와 함께 제공되었습니다.

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

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

//const {createStore} = Redux;
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
