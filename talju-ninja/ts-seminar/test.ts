class Test {
  constructor() {
    console.log('test');
  }
}

new Test();

let myName = 'cs';
myName = 5; // 타입 추론에 의해 string에 number를 넣을 수 없다.
