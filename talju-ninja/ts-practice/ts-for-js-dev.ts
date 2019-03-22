/* 
    3.0 타입스크립트 기초 문법
*/

const isTypeScriptAwesome: boolean = true;
const doesJavaScriptHasTypes: boolean = false;

console.log(isTypeScriptAwesome);
console.log(doesJavaScriptHasTypes);

const yourScore: number = 100;
const ieee754IsAwesome: number = 0.1 + 0.2;

console.log(yourScore);
console.log(ieee754IsAwesome);

const authorName: string = 'cs';
const toReaders: string = `책을 읽어주셔서 감사합니다.
도움이 되었으면 좋겠습니다.
`;

console.log(authorName);
console.log(toReaders);

// null과 undefined는 각각 자기 자신 타입 또는 void만을 타입으로 할당할 수 있다.
const nullValue: null = null;
const undefinedValue: undefined = undefined;
// const numberValue: number = null; // type error

// null 이나 undefined 타입이 할당되지 않은 변수에 null이나 undefined를 넣는 것은
// ts 2.0 이상에서 --strictNullChecks 플래그에 의해 type error로 발생한다.
// const a: number = null;

console.log(nullValue);
console.log(undefinedValue);
// console.log(numberValue);
// console.log(a);

let bool: any = true;
bool = 3;
bool = 'whatever';
bool = {};

console.log(bool); // {}

// any 타입 값의 메소드를 호출할 때에는 타입 검사가 일어나지 않는다.
// 타입 검사는 통과하지만 런타임 단계에서 에러가 발생한다.
// bool.nonExistingMethod();
// bool.whatever(false);

// void는 null 또는 undefined만을 값으로 가지는 타입이다.
// 함수에서 아무것도 리턴하지 않을 때에는 void
function nothing(): void {}

// never는 아무런 값도 가질 수 없는 타입이다.
function alwaysThrow(): never {
  throw new Error(`I'm a wicked function!`);
}

alwaysThrow();
