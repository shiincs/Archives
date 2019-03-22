'use strict';
/*
    3.0 타입스크립트 기초 문법
*/
var isTypeScriptAwesome = true;
var doesJavaScriptHasTypes = false;
console.log(isTypeScriptAwesome);
console.log(doesJavaScriptHasTypes);
var yourScore = 100;
var ieee754IsAwesome = 0.1 + 0.2;
console.log(yourScore);
console.log(ieee754IsAwesome);
var authorName = 'cs';
var toReaders =
  '\uCC45\uC744 \uC77D\uC5B4\uC8FC\uC154\uC11C \uAC10\uC0AC\uD569\uB2C8\uB2E4.\n\uB3C4\uC6C0\uC774 \uB418\uC5C8\uC73C\uBA74 \uC88B\uACA0\uC2B5\uB2C8\uB2E4.\n';
console.log(authorName);
console.log(toReaders);
// null과 undefined는 각각 자기 자신 타입 또는 void만을 타입으로 할당할 수 있다.
var nullValue = null;
var undefinedValue = undefined;
// const numberValue: number = null; // type error
// null 이나 undefined 타입이 할당되지 않은 변수에 null이나 undefined를 넣는 것은
// ts 2.0 이상에서 --strictNullChecks 플래그에 의해 type error로 발생한다.
// const a: number = null;
console.log(nullValue);
console.log(undefinedValue);
// console.log(numberValue);
// console.log(a);
var bool = true;
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
function nothing() {}
// never는 아무런 값도 가질 수 없는 타입이다.
function alwaysThrow() {
  throw new Error("I'm a wicked function!");
}
alwaysThrow();
