# Redux: Avoiding Object Mutations with Object.assign() and ...spread

Object.assign ()과 ES7에 제안 된 스프레드 연산자를 사용하여 객체 변형을 방지하는 방법을 배웁니다.

## Transcript

00:00 앞의 예제에서와 같이 NPM의 expect and deep freeze(Object.freeze()) 라이브러리를 사용하여 테스트 코드를 만듭니다. 이번에는 to-do 객체를 필요로하고 완성 된 필드를 뒤집는 toggle to-do라는 함수를 테스트 할 것입니다. completed가 false 인 경우 true를 반환합니다. completed가 true 인 경우 false를 반환 합니다.

00:22 이전의 강좌와 같이, 현재 테스트를 통과하는 mutate 된 버전을 작성하여 시작할 것입니다. mutate 된 버전은 완성 된 필드를 뒤집어 과거의 객체에 다시 지정합니다.

00:35 우리는 Redux에서 mutate가 허용되지 않는다는 것을 알고 있습니다. 그래서 이것을 강요하기 위해, 나는 할일 객체에 freeze를 적용합니다. completed는 더 이상 변경할 수 없습니다.

00:46 이것의 한 가지 방법은 completed를 제외한 원래의 객체에서 복사 된 모든 필드를 사용하여 새 객체를 만드는 것입니다.이 객체는 뒤집을 수 있습니다. 그러나 나중에 새 객체에 새 속성을 추가 할 경우이 객체를 포함하도록이 코드를 업데이트해야합니다.

01:04 ES6에 익숙한 객체 할당 방법을 사용하도록 제안한 이유입니다. 그것은 당신이 대상 객체에 여러 객체의 속성을 할당 할 수 있습니다. 객체가 인수 순서를 할당하는 방법은 JavaScript 할당 연산자의 순서와 일치합니다.

01:24 첫번째 인수는 속성이 할당 될 인수입니다. 그래서 그것은 변이 될 것입니다. 이것이 빈 객체를 첫 번째 인수로 전달하는 이유이므로 기존 데이터를 변경하지 않습니다. 객체 할당에 대한 모든 추가 인수는 속성이 대상 객체에 복사 될 소스 객체 중 하나로 간주됩니다.

01:46 여러 소스가 동일한 속성에 대해 다른 값을 지정하면 마지막 소스가 이기는 것이 중요합니다. 이것은 원래 to-do 객체가 말하는 것과 달리 완성 된 필드를 오버라이드하기 위해 사용하는 것입니다.

02:01 마지막으로, 객체 할당은 ES6의 새로운 메소드이므로 모든 브라우저에서 기본적으로 사용할 수 없다는 것을 기억해야합니다. Babel과 함께 제공되는 독립 실행 형 개체 또는 Polyfill을 할당하는 Polyfill을 사용하여 웹 사이트를 위험에 빠뜨리지 않고 사용할 수 있습니다.

02:21 polyfill을 필요로하지 않는 또 다른 옵션은 ES6의 일부가 아닌 새로운 객체 스프레드 연산자를 사용하는 것입니다. 그러나 ES7에서 제안되었습니다. 그것은 꽤 인기가 있고, 당신이 무대 2 프리셋을 사용한다면 바벨에서 가능합니다.

```js
const expect = require("expect");

const toggleTodo = todo => {
  // wrong way
  // todo.completed = !todo.completed;
  // return todo;
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Learn Redux",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Learn Redux",
    completed: true
  };

  Object.freeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
console.log("Pass Test");
```
