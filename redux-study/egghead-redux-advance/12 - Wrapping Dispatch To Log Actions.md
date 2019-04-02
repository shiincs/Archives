# Redux: Wrapping dispatch() to Log Actions

Redux의 중앙 집중식 업데이트를 통해 콘솔의 모든 상태 변경 사항을 콘솔에 기록하는 방법을 배울 것입니다.

## get start

state의 복잡도가 올라갔기 때문에 store.dispatch 기능을 재정의하여 일부 콘솔 로그를 추가하여 state가 해당 동작의 영향을받는 방식을 확인할 수있게하려고합니다.

인수로 store을 받아 dispatch에 추가 로그라는 새로운 기능을 만들어보려한다. Redux에서 제공하는 dispatch를 ​​래핑 할 것이므로 store.dispatch에서 원본 dispatch를 ​​읽습니다.

단일 action 인수 인 dispatch와 같은 서명을 가진 다른 함수를 반환합니다. Chrome과 같은 일부 브라우저는 콘솔 그룹 API를 사용하여 하나의 제목 아래에 여러 개의 로그 문구를 그룹화하고 몇 가지 로그를 작업 유형으로 그룹화하기 위해 작업 유형을 전달합니다.

store.getState()를 호출하여 action을 보내기 전에 이전 상태를 로깅합니다. 다음으로, 나는 action 자체를 기록 할 것이므로 어떤 행동이 변화를 일으키는 지 알 수있다.

dispatch 함수의 계약을 정확히 유지하기 위해 return 값을 선언하고 action에 원본 dispatch 함수를 호출합니다. 이제는 호출 코드가 내 기능과 Redux가 제공하는 기능을 구분할 수 없지만 일부 정보는 로그에 남습니다.

dispatch가 호출 된 후에 state가 업데이트 될 것이므로 dispatch 후에 다음 상태를 받기 위해 store.getState()를 사용할 수 있으므로 다음 상태도 로깅하려고합니다.

Google 크롬과 같은 일부 브라우저는 콘솔 로그 스타일 API를 제공하며 로그에 일부 색상을 추가 할 예정입니다. 이전 상태의 회색을 그렸습니다. 작업은 파란색이고 다음 상태는 녹색입니다.

콘솔 그룹 API는 모든 브라우저에서 사용할 수 없으므로 지원되지 않는 경우 원시 디스패치를 ​​그대로 반환합니다.

마지막으로 프로덕션 환경에서 모든 것을 기록하는 것은 좋지 않습니다. 따라서 프로세스와 노드가 들리지 않는 것이 프로덕션이 아닌 경우이 코드를 실행하게 될 것이라는 문구 를 추가 할 것입니다. 그렇지 않으면, 나는 그대로 store를 떠날 것입니다.

래핑 된 dispatch 기능으로 앱이 어떻게 돌아가는지 살펴 보겠습니다. 이제는 할 일 추가와 같은 작업을 보낼 때마다 로그에서 볼 수 있습니다. 이전 상태에서는 ID가없고 byId 조회 테이블이 비어 있음을 볼 수 있습니다.

그러면 todo add 형식의 작업과 todo의 ID와 텍스트가 표시됩니다. 마지막으로 작업을 전달한 후 상태에서 모든 ID의 ID와 ById 매핑의 해당 할일을 볼 수 있습니다.

Redux 저장소 상태를 변경하는 유일한 방법은 action을 dispatch하는 것입니다. 이제는 모든 작업을 작업 전후의 상태와 함께 기록하므로 상태에 action으로 인해 실수가있는 경우 찾기가 쉽습니다.

어떻게 작동하는지 다시 한번 살펴 보겠습니다. 저장소를 가져 오는 새로운 함수를 추가하고, 그로부터 디스패치하고, 브라우저가 콘솔 그룹 API를 지원하지 않으면 원래의 디스패치 함수를 반환합니다.

그렇지 않으면, 나는 dispatch과 같은 새로운 기능을 반환합니다. 액션 인수를 받아들이며 내부의 원래 디스패치 함수를 호출합니다. 그러나 작업 유형이있는 그룹에 몇 개의 로그도 저장합니다.

나는 dispatch하기 전에 store.getState()를 호출하여 이전 상태를 기록한다. 저장소 파견 함수가 동기식이라는 것을 알고 있기 때문에 변경 작업을 기록한 다음 저장소의 다음 상태를 기록하기 위해 저장소 상태를 다시 호출 할 수 있습니다.

마지막으로, 기본 디스패치 함수와 완벽한 호환성을 유지하기 위해 반환 된 항목을 반환합니다. 일반적으로 이것은 액션 객체입니다.

제 함수는 래핑 된 디스패치 함수를 반환하므로, 값을 반환하여 저장소 디스패치 메서드를 재정의합니다. 프로덕션 환경에서이 코드를 실행하고 싶지 않으므로 환경 검사에서 랩핑하십시오.

그 자체로이 검사는 충분하지 않습니다, 그리고 생산 빌드에서 당신이 웹팩을위한 플러그인을 정의하거나 사용하는 경우에만 제대로 작동 들리지 Browserify 변환을.

```js
import { createStore } from "redux";
import todoApp from "./reducers";

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch; // 함수를 가져옴
  if (!console.group) {
    return rawDispatch;
  }

  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color:green", store.getState());
    console.groupEnd(action.type);
    console.group(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  const store = createStore(todoApp);
  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

export default configureStore;
```
