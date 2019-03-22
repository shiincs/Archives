// string
let myName = 'Max';
// myName = 28;

// number
let myAge: number = 27;
// myAge = 'Max';

// boolean
let hasHobbies: boolean = false;
// hasHobbies = 1;

// assign types
let myRealAge: number;
myRealAge = 27;
// myRealAge = '27';

// array
let hobbies: any[] = ['Cooking', 'Sports'];
hobbies = [100];
// hobbied = 100;

// tuples
let address: [string, number] = ['Superstreet', 99];

// enum
enum Color {
  Gray, // 0
  Green = 100, // 100
  Blue = 2, // 2
}
let myColor: Color = Color.Green;
console.log(myColor);

// any
let car: any = 'BMW';
console.log(car);
car = { brand: 'BMW', series: 3 };
console.log(car);

// functions
function returnMyName(): string {
  return myName;
}
console.log(returnMyName());

// void
function sayHello(): void {
  console.log('hello!');
  // return myName;  // error
}

// argument types
function multiply(value1: number, value2: number): number {
  return value1 * value2;
}

// console.log(multiply(2, 'Max')); // NaN, error
console.log(multiply(10, 2));

// function types
let myMultiply: (val1: number, val2: number) => number;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 2));

// object types
// 객체 타입에서는 함수 타입에서처럼 순서가 정해져있지 않기 때문에
// 객체의 키값이 기준이 되기 때문에 정확히 맞춰줘야 한다.
// 각 키값의 밸류 타입도 일치하지 않으면 타입 에러가 발생한다.
// '=' 왼쪽에는 이 객체의 타입을 지정한다. (실제 객체가 아니다)
// '=' 오른쪽에는 실제 객체를 할당한다.
let userData: { name: string; age: number } = {
  name: 'cs',
  age: 29,
};
/*
userData = {
  a: 'hello', // 밸류의 타입은 일치하지만 키값이 달라서 에러
  b: 22,
};
*/

// complex object
let complex: { data: number[]; output: (all: boolean) => number[] } = {
  data: [100, 3.99, 10],
  output: function(all: boolean): number[] {
    return this.data;
  },
};
// complex = {}; // error (type not satisfied)
console.log(complex.output(true));

// type alias
type Complex = { data: number[]; output: (all: boolean) => number[] };

// 타입으로 정의해 놓은 Complex는 변수처럼 타입 자리에 대입 가능하다.
let complex2: Complex = {
  data: [100, 3.99, 10],
  output: function(all: boolean): number[] {
    return this.data;
  },
};
