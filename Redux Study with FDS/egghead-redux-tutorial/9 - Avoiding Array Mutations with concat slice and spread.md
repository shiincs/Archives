# Redux: Avoiding Array Mutations with concat(), slice(), and ...spread

Note : 이 코드에서는 Expect 및 Deep-Freeze 라이브러리를 사용하여 테스트 및 변이 검사를 각각 수행합니다.

- Expect 및 Deep-Freeze 라이브러리를 jsbin 에서 사용하는데 어려움이 있어,
- https://repl.it 에서 실행할 수 있는 코드로 변형해 보았습니다.
- Deep-Freeze 라이브러리 대신 Object.freeze 빌트인 메서드를 활용했습니다.

concat (), slice () 및 ES6 배열 스프레드 연산자를 사용하여 배열을 변형시키는 것을 방지하는 방법을 배웁니다.

## expect.js

(https://jestjs.io/docs/en/expect)[https://jestjs.io/docs/en/expect]

테스트를 작성할 때 종종 값이 특정 조건을 충족하는지 확인해야합니다. expect는 여러 가지 "유효성 검사기"에 대한 액세스를 제공하여 여러 가지를 검증합니다.

## Object.freeze()

Object.freeze() 메서드는 객체를 동결합니다. 동결된 객체는 변경할 수 없습니다. 즉 새로운 속성을 추가할 수 없고, 기존 속성을 제거하거나 열거, 설정, 쓰기 가능 여부를 바꿀 수 없고, 기존 속성의 값도 변경할 수 없으며 프로토타입의 변경도 방지합니다.

## Transcript

00:00 이 레슨에서는 Expect Library를 사용하여 테스트코드를 작성하고 deepFreeze(Object.freeze)를 사용하여 코드에 변형이 없는지 확인합니다.

00:09 카운트 릴리즈 애플리케이션을 구현하고 싶다고 가정 해 봅시다. 그 기능을 수행하는 몇 가지 함수를 작성해야 할까요? 특성 및 특성은 개별 카운터를 나타내는 JavaScript 숫자의 배열입니다.

00:23 내가 쓰고 싶은 첫 번째 기능은 카운터 추가 (Add Counter)입니다.해야 할 일은 과거 배열의 끝에 0을 추가하는 것입니다.

00:33 처음에는 배열 푸시 (push) 메서드를 사용하여 배열의 끝에 새 항목을 추가하고 작동합니다. 그러나 우리는 Redux에서 mutate(변형)를 피하는 법을 배워야하며 원래 배열에서 deepFreeze(Object.freeze) 호출하여이를 시행합니다.

00:49 이제는 push가 작동하지 않습니다. 고정 된 개체에 새 속성을 추가 할 수 없습니다. push 대신에 원래 배열을 수정하지 않는 concat 메서드를 사용할 것입니다.

01:03 이제 테스트는 mutate(변형)없이 진행되며 새 ES6 스프레드 연산자를 사용하여 동일한 코드를보다 간결하게 작성할 수 있습니다.

01:15 다음 함수는 카운터 제거라고하며 두 개의 인수, 숫자 배열 및 배열에서 건너 뛰는 숫자의 인덱스를받습니다.

01:25 세 개의 숫자가 있고 두 번째 인수로 하나를 전달하는 경우 결과 배열에서 두 번째 항목을 건너 뛰고 두 개의 숫자가있는 배열을받을 것으로 예상됩니다.

01:36 일반적으로 배열에서 항목을 삭제하려면 splice 메서드를 사용합니다. 그러나 splice는 mutate 방식이므로 Redux에서는 사용할 수 없습니다.

01:46 배열 개체를 freeze하고, 지금은 그것을 mutate없이 배열에서 항목을 제거하는 다른 방법을 알아낼 필요가있습니다.

01:56 여기서 slice() 메서드를 사용하고 있습니다. 그것은 splice()와 아무 상관이 없습니다. 그것은 mutate가 아니며 배열의 일부를 처음부터 끝까지 반환합니다.

02:08 내가하고있는 일은 내가 건너 뛰고 싶은 인덱스 앞에 파트를 가져 가고 건너 뛸 인덱스 뒤에 포인터를 연결 한 다음 새 배열을 가져 오는 것입니다.

02:20 마지막으로, concat 호출을 사용하여 메서드 체인으로 작성하는 대신 ES6 스프레드 연산자를 사용하여보다 간결하게 작성할 수 있습니다.

02:33 카운터 추가와 제거를 구현 했으므로 카운터에 증가분을 구현해 보겠습니다. 증가 카운터 함수는 인수, 증가 할 카운터의 배열 및 인덱스를 취하므로 반환 값의 항목 수가 동일하지만 그 중 하나가 증가합니다.

02:54 인덱스에서 배열 값을 직접 설정하지만 이것은 mutate입니다. freeze하고 호출을 추가하면 더 이상 작동하지 않으므로 배열의 단일 값을 변경하지 않고 어떻게 대체 할 수 있을까요?

03:10 답은 아이템을 제거하는 것과 정말로 비슷합니다. slice를 index 앞에 가져 와서 새로운 값을 가진 단일 항목 배열과 연결 한 다음 원래 배열의 나머지 부분과 연결합니다.

03:25 마지막으로, ES6 스프레드 연산자를 사용하여 배열의 왼쪽 부분에 스프레드를 적용하고 새 항목을 지정한 다음 원래 배열의 오른쪽 부분에 스프레드를 적용하면 훨씬 멋지게 보입니다.

03 38 이 단원에서는 그들을 mutate하지 않고 배열의 항목을 추가, 제거 및 변경할 수 concat 방법 또는 spread 연산자와 slice 방법을 사용하는 방법과 test에서 mutate에서 freeze로 자신을 보호하는 방법을 배웠습니다 .

```js
const expect = require("expect");

const addCounter = list => {
  // list.push(0);
  // return list.concat([0]); // old way
  return [...list, 0]; // ES6 way
  return list;
};

const removeCounter = (list, index) => {
  // list.splice(index, 1);
  // Old way:
  //return list
  //  .slice(0, index)
  //  .concat(list.slice(index + 1));

  // ES6 way:
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

const incrementCounter = (list, index) => {
  //  list[index]++;
  // Old way:
  // return list
  //  .slice(0, index)
  //  .concat([list[index] + 1])
  //  .concat(list.slice(index + 1));

  // ES6 way:
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  Object.freeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  Object.freeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  Object.freeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testRemoveCounter();
testIncrementCounter();
testAddCounter();
console.log("All tests passed");
```
