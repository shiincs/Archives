# redux tutorial

```js
// 액션 타입을 상수 값으로 정의해준다.
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 액션 생성 함수(action creator)를 만든다.
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
});

const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff
});

// console.log(increment(1));
// console.log(decrement(2));

// 리듀서에서 사용할 초기 상태를 정의해준다.
const initialState = {
  number: 0,
  foo: 'bar',
  baz: 'qux'
}

// 리듀서 함수를 정의해준다.
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        // 아래처럼 ES6의 spread operator를 활용하면 더 깔끔하게 코딩이 가능하다.
        ...state,
        number: state.number + action.diff
      };
      /* 리턴문은 아래처럼 Object.assign을 사용해서 작성할 수도 있다.
      return Object.assign({}, state, {
        number: state.number + action.diff
      });
      */
    case DECREMENT:
      return { 
        ...state,
        number: state.number - action.diff
      };
    default:
      return state;
  }
}

// console.log(counter(undefined, increment(1)));
// console.log(counter(undefined, decrement(1)));

// 스토어를 만들어준다.
// 실제 프로젝트에서는 import { createStore } from 'redux'; 이렇게 불러온다.
const { createStore } = Redux;

// import 한 createStore 메서드에 counter 리듀서를 인자로 넣어서 store 객체를 만든다.
const store = createStore(counter);

// 리덕스 스토어를 구독하도록 subscribe 메서드를 호출한다.
// subscribe 메서드를 호출하면 구독을 취소할 수 있는 unsubscribe 메서드가 리턴된다.
// 구독하고나면 스토어의 상태가 바뀔때마다 subscribe 메서드의 콜백이 실행된다.
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// store의 메서드인 dispatch를 이용해 액션을 전달한다.
// 액션들이 디스패치될 때마다 구독했던 함수를 실행한다.
store.dispatch(increment(1));
store.dispatch(decrement(5));
store.dispatch(increment(10));
```

