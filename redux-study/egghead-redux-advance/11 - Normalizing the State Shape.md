# Redux: Normalizing the State Shape

실제 애플리케이션에서 중요한 데이터 일관성을 보장하기 위해 상태 모양을 표준화하는 방법을 배웁니다.

우리는 현재 todos를 todo 객체의 배열로써 자유롭게? 작성하였다.
하지만, 실제 서비스하는 어플리케이션에서 우리는 하나 이상의 배열을 가지고 있고, 서로 다른 배열에 있는 동일한 ID를 가진 todos가 동기화되지 않을 수도 있다.

그래서 나는 내 상태를 데이터 베이스처럼 취급하고,
todos ID로 인덱싱된 객체에 내 todos를 유지하려 한다.
내 reducer 이름을 byId로 바꿧다. 그리고 마지막에 새 항목을 추가하거나 모든 항목 위에 매핑하지 않고, 조회된 테이블의 값을 변경한다.

toggle todo 와 add todo 는 이제 동일한 역할을 하게 될 것이다. aciton.id에 대한 값이 reducer ID 및 action에서 이전 값의 reducer를 호출 한 결과가 될 새로운 조회 테이블을 반환하고 싶습니다.

컴포지션을 줄이기 위해서이지만 배열 대신 객체를 사용하는 것입니다.
babel 설정으로 spread 문법을 사용할 수 있습니다.

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// change

const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    default:
      return state;
  }
};
```

ByID reducer가 action을 받을 때마다,
ID와 현재 action 사이의 매핑 사본을 현재 작업에 대한 업데이트 된 todos로 반환합니다.내가 추가 된 모든 ID를 추적하는 다른 reducer를 보내 줄 것입니다.

우리는 todos 를 ByID에 매핑히고있습니다.이 reducer의 상태는 todos 배열이 아닌 ID 배열입니다. 액션 타입을 바꿉니다.
신경써야할 액션은 todo reducer에서입니다. todo가 추가된다면, 해당 todo에 ID를 가진 새로운 ID배열을 마지막 항목으로 반환하고 싶습니다.

다른 모든 액션의 경우, 현재 상태, 즉 ID의 현재 배열을 반환하면됩니다.
나는 여전히 todos 파일에서 하나의 reducer를 내보낼 필요가 있으므로, combineReducers를 다시 사용하여 ByID와 AllIDs reducer를 결합 할 것입니다.

당신은 원하는만큼 여러 번 결합 된 감속기를 사용할 수 있습니다.
최상위 감속기에서만 사용할 필요는 없습니다. 실제로 앱이 성장함에 따라 여러 곳에서 combineReducers를 사용하는 것이 일반적입니다.

reducer의 state shape을 변경했습니다.
우리는 또한 그것에 의존하는 selector를 업데이트해야합니다.
state 객체가 이제 ByID 및 AllIDs 필드가 포함됩니다.
그것은 결합 된 reducer의 C에 해당하기 때문입니다.

```js
import { combineReducers } from "redux";
// ...
const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD-TODO":
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});
```

todos 배열은 더이상 존재하지 않으므로,이것을 계산할 selector를 작성할 것입니다. 이것은 export 하지 않을 것입니다. 현재의 파일 에서만 사용하고,
allIds를 byId 조회 테이블에 매핑한 상태를 반환하기 때문입니다.

getVisibleTodos selector 안에서 allTodos라는 변수명으로 filter할 수 있는 todos 배열을 가져옵니다. allTodos는 todos의 배열입니다.
모든 todos는 내가 예상 한 구성 요소와 마찬가지로 todos 배열이므로 selector에서 반환 할 수 있으므로 구성 요소 코드의 변경은 걱정하지 않아도됩니다.

```js
// create
const getAllTodos = state => state.allIds.map(id => state.byId[id]);

// add getAllTodos(), replace state to allTodos
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case "all":
      return allTodos;
    case "completed":
      return allTodos.filter(t => t.completed);
    case "active":
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
```

내 todos 파일이 꽤 많이 커졌기 때문에 todo reducer를 추출하는 것이 좋은 시점입니다. todo reducer를 관리하면 작업 할 때 자신의 파일로 분리됩니다.
동일한 폴더에 todo라는 파일을 만들었으므로 code를 바로 붙여 넣어 todos 파일에서 가져올 수 있습니다.

정규화되고 더 많은 데이터베이스와 같이 상태 구조가 어떻게 바뀌 었는지 다시 한번 살펴 보겠습니다.나는 방금 토드 감속기를 별도의 파일로 추출했지만 상태는 변경되지 않았습니다.

그것은 하나의 할 일 아이템에 대한 업데이트를 처리하는 감속기입니다.
저는이 reducer를 오늘 제가 작성한 새로운 reducer 내부에서 사용하고 있는데, 이것은 byId라고 불리우며 state shape은 object입니다.
action 으로부터 업데이트된 todo 의 id를 읽고, todo reducer를 이전 상태의 id와 action 과 호출합니다.

addTodo 액션의 경우 해당하는 todo가 아직 조직화된 테이블에 존해자힞 않습니다. 우리는 todo reducer를 첫번째 인수가 정의되지 않은 상태로 호출합니다. todo reducer 는 addTodo 를 처리할 새로운 todo object를 반환하므로,
이 객체는 다음 버전의 조회 테이블 내부에서 action.id key 아래에 할당됩니다.

object spread 연산자와 계산된 속성 구문을 혼합하는 방법에 주목해야합니다.
이를 통해 action ID 내부의 동적 키에 값을 지정할 수 있습니다.
또한 object spread 연산자는 babel 플러그인이 필요합니당.

나는 또한 todos의 ID array를 관리하는 allIds라는 두 번째 reducer를 작성했습니다. 할 일이 추가 될 때마다 맨 마지막에 새로운 할 일 목록의 ID가있는 새 배열을 반환합니다.

ES6의 일부인 배열 spread 연산자를 사용하여 allIds와 새 ID가 새 배열로 생성됩니다. 이제 두 감속기가 동일한 동작을 처리합니다. 이것은 Redux 앱에서 매우 일반적입니다.

나는 Redux가 제공 한 combineReducers를 호출하여 하나의 reducer에 두 reducer를 결합합니다. reducer 계층 구조에서 여러 수준의 combineReducers를 사용할 수 있습니다.

state가 변경 되었기 때문에 나는 그것에 의존하는 selector를 업데이트해야했습니다. 나는 ID를 룩업 테이블에 매핑하여 모든 todos 객체를 상태에서 모으는 모든 todos를 얻는 private selector를 작성했습니다.

모든 id에 대해, 우리는 todo을 state에서 얻습니다. 바이. 나는이 상태가되기 전에 사용 된 보이지 않는 todos를 얻는 것과 정확히 같은 모양을 가진 todos 배열을 반환 할 것이다.

나는 모든 todos를 얻을 수 있으며, 필터링을 위해 모든 todos를 사용할 수 있으며 변경 될 필요가없는 새로운 ID로 반환 할 수 있습니다. 왜냐하면 모든 state shape 지식이 selector에 캡슐화되기 때문입니다.
