# 13. Adding a Fake Backend to the project (프로젝트에 가짜 백엔드 추가)

다음 강의에서는 더 이상 지속(유지)에 대해 다루지 않을 것입니다. 대신, 앱에 비동기 수신을 추가할 것입니다.

이제 `localStorage` 지속(유지)에 관련된 모든 코드를 지울 것입니다. 그리고 `localStorage.js` 파일도 마찬가지로 지웁니다. 가짜 원격 API를 수행하는 새로운 모듈이 추가되기 때문입니다.

모든 todos들은 메모리에 저장되고, 인공적인 지연이 추가됩니다. 또한 우리는 실제 API 수행과 같이 프로미스를 리턴하는 메서드를 갖습니다.

#### `src/api/index.js`

```js
import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    .
    .
    .
```

이러한 접근은 우리로 하여금 리덕스가 앱에 대한 실제 백엔드를 작성하지 않고도 비동기적인 데이터 수신을 어떻게 수행하는지에대해 탐색할 수 있게끔 해줍니다.

이제 우리는 `fetchTodos`를 우리 앱의 다른 모듈들에 import할 것입니다.

`import { fetchTodos } from './api'`

우리는 나중에 리덕스 스토어에 이러한 todos들을 넣는 법에 대해 배울 것입니다. 하지만 지금은 filter 인자와 함께 `fetchTodos`를 호출할 수 있습니다. 그리고 그것은 REST 백엔드가 배열을 리턴하는 것처럼 todos의 배열을 귀결시키는(성공해서 반환하는) 프로미스를 리턴할 것입니다.

#### `index.js`

```js
fetchTodos('all').then(todos =>
  console.log(todos)                      
);
```

가짜 API는 네트워크 연결을 시뮬레이션하기 위해 0.5초 동안 기다린 다음, 우리가 원격 서버로부터 검색된 것처럼 취급할 todos의 배열에 대한 프로미스를 귀결시킬 것입니다.

