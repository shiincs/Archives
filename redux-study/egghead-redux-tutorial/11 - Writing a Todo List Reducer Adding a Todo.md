# Redux: Writing a Todo List Reducer (Adding a Todo)

todo list에 todo를 추가하는 방법에 대해 배워봅시당.

## Transcript

00:00 앞의 두 강좌와 마찬가지로, 필자는 기대 라이브러리를 사용하여 테스트 및 freeze 라이브러리를 작성하여 코드에서 우발적 인 mutate를 방지한다. 이 강좌에서는 to-do 목록 응용 프로그램에 대해 reducer를 작성하고 그 상태가 할 일 목록으로 설명됩니다.

00:18 reducer에 대해 다시 생각해봅시다. 순수 함수로 작성되여야 하며 하며 어플리케이션 로직을 업데이트하는 기능을 가집니다. action 을 dispatch하여 현재의 상태로부터 다음 상태를 계산해냅니다.

00:33 reducer를 작성하기 전에, 코드가 정확하게 작동하도록 작성되었는지 알 방법이 필요합니다,그래서 테스트 코드를 작성했습니다. 두 변수를 선언하고 있는데, 그 전의 상태는 빈 배열입니다. action이 dispatch됩니다. 이는 사용자가 일부 ID 및 텍스트가있는 할 일을 추가하는 동작을 설명하는 액션입니다.

00:55 reducer를 호출한 뒤에 예상되는 상태를 정의합니다. 이전처럼 상태와 마찬가지로 배열이지만 이번에는 방금 추가 한 할 일을 나타내는 단일 요소가 있습니다. 따라서 액션 객체와 동일한 ID와 텍스트를가집니다. 또한 completed 라는 추가 필드가 있습니다.이 필드는 false로 초기화됩니다.

01:20 우리는 reducer가 순수한 함수인지 확인하고 싶습니다. 그래서 나는 state와 action을 완전히 동결 시켰습니다. 마지막으로, 기대 expect 라이브러리를 사용하여 이전 상태의 reducer와 action객체를 호출하면 방금 선언 한 후 state와 동등한 결과를 얻는 지 확인합니다.

01:45 이것으로 첫 번째 테스트를 마 칩니다 . 이제 일반 JavaScript 함수처럼 호출 할 수 있습니다. 기대 전화를하지 않으면 테스트가 통과되었다는 메시지를 보게됩니다.

01:59 reducer가 작성되지 않았기 때문에 실패합니다. 그것은 비어있는 기능입니다. 그래서 그것은 테스트에서 기대하는 단일 항목을 가진 배열 대신 undefined를 반환합니다.

02:13 이 문제를 해결하려면 감속기가 동작 유형 속성 (문자열)을 살펴 봐야합니다. 테스트 할 때 수행 할 작업 유형으로 지정한 at-do 문자열과 일치하면 테스트를 완료하기 위해 원래 배열의 모든 항목을 포함하는 새로운 배열을 리턴해야하며, 액션 객체에서 복사 된 ID와 텍스트 및 완료 필드가 false로 설정됩니다.

02:44 마지막으로, average는 모든 알 수없는 작업에 대한 현재 상태를 반환해야하기 때문에 switch 문에 default case를 추가합니다.

02:54 이제 테스트가 성공적으로 끝납니다 . 이 예에서 데이터 흐름을 재검토하여 이유를 확인해 보겠습니다.

03:03 먼저 빈 배열 인 상태 배열과 테스트 함수 안에있는 액션 객체를 만듭니다. 나는 그들을 감속기 기능에 대한 논증으로, "할 일"이라고합니다. 할 일 감속기는 상태와 액션을 인수로 받아들이고 액션 유형을 살펴 봅니다.

03:26 이 경우 동작 유형은 "할 일"이라는 문자열이며 감속기 내부의 스위치 케이스와 일치합니다. 감속기는 이전 배열의 항목과 추가 할 To Do를 나타내는 새 항목을 포함하는 새 배열을 반환합니다.

03:44 그러나 우리가 테스트에서 통과 한 상태는 실제로는 빈 배열 이었으므로 마지막에는 새로운 할일 인 단일 항목으로 배열을 가져옵니다.

3시 57분는 마지막으로, 우리가 의도 한대로 감속기가 작동하는지 확인하기 위해 하나의 할 일 항목을 배열로 반환 값을 비교합니다. 평등 검사가 통과합니다. 이것은 시험을 성공적으로 만든다.

```js
const expect = require("expect");

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ];

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
console.log("All tests passed!");
```
