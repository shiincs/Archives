# 04. Refactoring the Entry Point

이 장에서 우리는 스토어를 만들고 구독하는데 필요한 로직을 분리된 파일로 추출할 것입니다.

**`index.js` 이전(before) 코드**

```jsx
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import App from './components/App'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()
const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos,
  })
}, 1000))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

우리는 새로운 파일인 `configureStore.js`를 호출할 것입니다. 그리고 스토어 생성과 유지 로직을 갖는 `configureStore`라는 함수를 만들면서 시작할 것입니다.

우리의 앱이 스토어가 어떻게 생성되며, 핸들러들을 구독하는지 여부에 대해 정확히 알지 못해도 되기 때문에 우리는 이러한 방식을 사용합니다. 이것은 `index.js` 파일에서 반환된 스토어를 단지 사용할 수 있습니다.

`configureStore.js`

```jsx
import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 1000))

  return store
}

export default configureStore
```

`store` 대신 `configureStore`를 export 함으로써, 우리는 테스트하기를 원하는 만큼 많은 스토어 인스턴스들을 만들어낼 수 있습니다.

**`index.js` 이후(after) 코드**

```jsx
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import configureStore from './configureStore'

const store = configureStore()
render(
  <Root store={store} />,
  document.getElementById('root')
);
```

또한 우리가 `Root`로 불리는 분리된 컴포넌트로 root 렌더링 엘리먼트를 추출했다는 것을 주의하세요. 그것은 `store`를 prop으로 받고, 우리의 `src/components` 폴더에서 분리된 파일로 정의될 것입니다.

---

**`Root` Component**

```jsx
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
```

우리는 `store`를 prop으로 받고, `react-redux`의 `Provider` 내부에서 `<App />`을 리턴하는 상태 없는 함수형 컴포넌트를 정의했습니다.

이제 `index.js` 안에서, 우리는 `Provider` import를 제거할 수 있을 뿐만 아니라 `App` 컴포넌트 import를 `Root` 컴포넌트 import로 대체할 수도 있습니다.