# Redux: React Counter Example

8_Redux_React_Counter_Example

Reux Redux 바인딩을 사용하기 전에 React와 Redux만으로 완벽한 간단한 애플리케이션을 작성하는 방법을 학습하십시오.

## Transcript

00:00 간단한 카운터 예제에서는 언제든지 상태 변경으로 문서 본문을 업데이트합니다. 그러나 이 접근법은 복잡한 응용 프로그램으로 확장되지 않습니다. DOM을 수동으로 업데이트하는 대신 React를 사용할 것이입니다.

react와 react-dom 패키지를 스크립트에 추가 하고 렌더링 할 루트를 추가하고 있습니다. 이제 ReactDOM.render를 루트 컴포넌트로 호출 할 수 있습니다. 렌더링 함수는이 저장소 상태가 변경 될 때마다 호출되므로이 저장소의 현재 상태를 내 루트 구성 요소의 소품으로 안전하게 전달할 수 있습니다.

```html
<script src="https://fb.me/react-15.1.0.js"></script>
<script src="https://fb.me/react-dom-15.1.0.js"></script>
</head>
<body>

  <div id="root"></div>
</body>
```

```js
// ... store created with `counter` reducer ...

const Counter = ({ value }) => <h1>{value}</h1>;

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
```

00:39 state는 Redux 저장소 안에 있기 때문에 Counter compoent는 함수형 컴포넌트입니다. 이것은 React 14 이후에 구성 요소를 선언 할 때 지원되는 방법입니다.

00:51 증가 감소 버튼을 추가했습니다.이 요소들이 의존성을 가지지 않길 바랍니다.. 그래서 나는 증가와 감소 함수을 콜백으로 추가합니다. 내 렌더링 메서드에서 store.dispatch를 호출하는 콜백을 적절한 작업과 함께 전달합니다. 이제 밭,ㄴ 클릭하면 응용 프로그램 상태가 업데이트됩니다.

01:21 이 어플리케이션이 어떻게 작동하는지 다시 한번 살펴 보겠습니다. 카운터 구성 요소는 내가 덤프 구성 요소라고 부르는 것입니다. 비즈니스 로직을 포함하지 않습니다. 현재 응용 프로그램 상태가 렌더링 가능한 출력으로 변환되는 방법과 소품을 통해 전달 된 콜백이 이벤트 처리기에 바인딩되는 방법 만 지정합니다.

01:45 카운터를 렌더링 할 때, 값을 Redux 저장소의 현재 상태에서 가져와야한다고 지정합니다. 사용자가 "증가"또는 "감소"를 누르면 해당 조치가 Redux 상점에 전달됩니다. 우리의 reducer는 현재 상태와 파견중인 작업에 따라 다음 상태를 계산하는 방법을 지정합니다.

02:07 마지막으로 Redux 저장소에 가입하여 상태가 변경 될 때마다 렌더링 함수가 실행되므로 카운터가 현재 상태를 가져옵니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.js"></script>
    <script src="https://fb.me/react-15.1.0.js"></script>
    <script src="https://fb.me/react-dom-15.1.0.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
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

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: "INCREMENT"
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: "DECREMENT"
        })
      }
    />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
```
