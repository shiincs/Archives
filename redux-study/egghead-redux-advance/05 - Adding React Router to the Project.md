# 05. Adding React Router to the Project

이 장에서, 우리는 리액트 라우터를 추가할 것입니다.

**`Root.js` 이전(before) 코드**

```jsx
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
.
.
.
```

이 프로젝트에 리액트 라우터를 추가하려면 `npm install --save react-router`를 실행하세요.

`Root.js` 내부에서 우리는 `Router`와 `Route` 컴포넌트를 import 할 것입니다.

또한 `<App />` 을 `<Router />`로 바꿉니다. 그것은 여전히 `<Provider />` 내부에 있기 때문에 어떤 컴포넌트든지 라우터에 의해 렌더링되는 것은 스토어에 계속해서 접근할 수 있다는 것이 중요한 포인트입니다.

`<Router />` 내부에 리액트 라우터에게 우리의 `<App />` 컴포넌트를 브라우저 주소바에서 루트 패스(`'/'`)에서 렌더링하겠다고 알려주는 하나의 `<Route />` 엘리먼트를 둘 것입니다.

**`Root.js` 이후(after) 코드**

```jsx
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
.
.
.
```

영상에서의 리액트 라우터 버전은 4.0.0 이전이기 때문에 현재의 리액트 라우터와 사용법이 약간 다릅니다.

**`Root.js` 이후(after) 코드 (리액트 라우터 v4.0.0 또는 그 이상)**

```jsx
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);
.
.
.
```

