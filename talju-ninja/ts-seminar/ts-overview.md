# TypeScript Overview

- 타입스크립트는 '프로그래밍 언어' 입니다.
- 타입스크립트는 'Compiled Language' 입니다.
  - 전통적인 Compiled Language와는 다른 점이 많습니다.
  - 그래서 'Transpile' 이라는 용어를 사용하기도 합니다.
- 자바스크립트는 'Interpreted Language' 입니다.

## Compiled

- 컴파일이 필요 O
- 컴파일러가 필요 O
- 컴파일하는 시점 O
  - => 컴파일 타임
- 컴파일된 결과물을 실행
- 컴파일된 결과물을 실행하는 시점

## Interpreted

- 컴파일이 필요 X
- 컴파일러가 필요 X
- 컴파일하는 시점 X
- 코드 자체를 실행
- 코드를 실행하는 시점 O
  - = 런타임

## 정적 타입 언어 VS 동적 타입 언어

## Traditional Compiled Language

- 컴파일 언어라고 한다.
- C, C++, Go, C#, Java, ...
- 프로그래머가 작성한 `Source Code`를 기계어로 변환하는 과정을 `Compile` 이라고 한다.
- 기계어로 변환된 결과물을 `Object Code(목적 코드)`라 한다.
- `Compile` 하는 프로그램을 `Compiler`라고 한다.
- `Compile` 하는 동안을 `Compile Time` 이라고 한다.
- 컴파일된 코드는 프로세서에 따라 다르다.
- 소스 코드에서는 OS에 따라 라이브러리가 다르다.
- 컴파일된 코드는 작은 크기에 최적화된다.
- 컴파일된 코드는 프로세서에 의존적이다.
- 일반적으로 실행 시 기계어로 바꾸는 방식(인터프리터 언어)보다 빠르다.
  - 실행 시 기계어로 바꿔주는 연산이 필요없기 때문이다.
- 컴파일된 코드들은 `Linking` 이라는 과정을 통해 실행 파일로 만들어진다.
  - 컴파일된 여러 목적 코드들을 합치고 라이브러리를 추가한다.
  - `Linking` 하는 프로그램을 `Linker` 라고 한다.
  - 컴파일이라는 말을 링킹까지 포함하여 말하기도 한다.

## TS Compiler Options

- [manual](http://json.schemastore.org/tsconfig)

### 최상위 프로퍼티

- compileOnSave: true / false (default false)
- extends
- compileOptions
- files: exclude보다 강한다.
- include: exclude보다 약하다. (gitignore 같은 glob 패턴)
- exclude (gitignore 같은 glob 패턴)

## @types

- TypeScript 2.0부터 사용 가능해진 내장 type definition 시스템
- 아무 설정을 안하면?
  - `node_modules/@types` 라는 모든 경로를 찾아서 사용
- typeRoots를 사용하면?
  - 배열 안에 들어있는 경로들 아래서만 가져옵니다.
- types를 사용하면?
  - 배열 안의 모듈 혹은 `./node_modules/@types/` 안의 모듈 이름에서 찾아옵니다.
  - [] 빈 배열을 넣는다는건 이 시스템을 이용하지 않겠다는 것입니다.
- typeRoots 와 types 를 같이 사용하지 않습니다.

## target과 lib

- target
  - 빌드의 결과물을 어떤 버전으로 할 것인가
  - 지정을 안하면 es3 (..?)
- lib
  - 기본 type definition 라이브러리를 어떤 것을 사용할 것인가
  - lib를 지정하지 않을 때,
    - target이 'es3' 이면, 디폴트로 `lib.d.ts`를 사용
    - target이 'es5' 이면, 디폴트로 `dom`, `es5`, `scripthost`를 사용
    - target이 'es6' 이면, 디폴트로 `dom`, `es6`, `dom.iterable`, `scripthost`를 사용
  - lib를 지정하면 그 lib 배열로만 라이브러리를 사용
    - 빈 배열일 경우 -> 'no definition found ... '

## module

- module
  - 컴파일 된 모듈의 결과물을 어떤 모듈 시스템으로 할지를 결정
  - target이 'es6' 이면 es6가 디폴트이고
  - target이 'es6'가 아니면 commonjs가 디폴트
  - AMD나 System과 사용하려면, outFile이 지정되어야 한다.
  - ES6나 ES2015를 사용하려면, target이 es5 이하여야 한다. (..?)
- moduleResolution
  - ts 소스에서 모듈을 사용하는 방식을 지정
  - Classic 아니면 Node
  - CommonJS 일때만 Node라고 생각하면 됨
- paths와 baseUrl
  - 상대경로 방식이 아닌 baseUrl로 꼭지점과 paths 안의 키/밸류로 모듈을 가져가는 방식
- rootDirs: 배열 안에서 상대 경로를 찾는 방식

## var, let, const

- var
  - ES5
  - 변수의 유효 범위: 함수 스코프
  - 호이스팅 O
  - 재선언 가능
- let, const
  - ES6
  - 변수의 유효 범위: 블록 스코프
  - 호이스팅 X
  - 재선언 불가
- let과 const의 타입 추론

  ```ts
  let a: string = '에이';
  let b = '비이';

  const c: string = '씨이';
  const d = '디이';

  /* 
    a는 명시적으로 지정된 타입인 string
    b는 타입 추론에 의한 타입인 string
    c는 명시적으로 지정된 타입인 string
    d는 타입 추론에 의한  타입인 리터럴타입
  */
  ```

## Type Assertions, Type alias

1. Type Assertions

- `타입이 이것이다` 라고 컴파일러에게 알려주는 것을 의미
- 실제로 타입을 바꾸는 형변환과는 달리 타입을 바꾸지는 않는다.
- 문법 작성방법
  - `변수 as 강제할타입`
  - `<강제할타입>변수`

```ts
let someValue: any = 'this is a string';

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;

/* 
  1. 주로 넓은 타입에서 좁은 타입으로 강제하는 경우가 많다.
  2. jsx에서는 주로 as를 쓴다.
*/
```

2. Type Alias

- 인터페이스랑 비슷하다.
- Primitive, Union Type, Tuple 에 대해서 사용한다.
- 직접 작성해야 하는 타입을 다른 이름으로 지정할 수 있다.
- 만들어진 타입의 reference를 만드는 것이지 실제 타입을 만드는 것이 아니다.
- `interface extends type alias` 가능
- `class implements type alias` 가능
- `class extends type alias 불가 (interface도 불가)`

## Interface

### Indexable type (optional 하게 사용된다)

1. object처럼 index를 string으로 사용하는 경우

```ts
interface Person {
  name: string;
  // [index: string]: string;
}
```

2. array처럼 index를 number로 사용하는 경우

```ts
interface Person2 {
  [index: number]: Person;
}

const p2: Person2 = {};
p2[0] = { name: 'changseon' };
p2[100] = 'hello'; // type error (Person type needed)
```

3. 특수한 경우

```ts
interface StringDictionaryNo {
  [index: string]: string;
  name: number; // error (인덱서블 타입이 string 값을 가지기 때문에 number를 필수로 끌어오면 에러)
}

interface test {
  [index: number]: number;
  1: string; // error (반대의 경우도 에러가 발생한다.)
}
```

### function in Interface

```ts
interface Person {
  name: string;
  hello(): string;
}

const person: Person = {
  neme: 'changseon',
  hello(): string {
    return 'hello';
  },
};
```

### class implements Interface

```ts
interface IPerson {
  name: string;
  hello(): void;
}

class Person implements IPerson {
  name: string = null;

  constructor(name: string) {
    this.name = name;
  }

  hello(): void {
    console.log(`안녕하세요 ${this.name} 입니다.`);
  }

  public hi(): void {
    console.log(`하이 난 ${this.name} 임.`);
  }
}

// 인스턴스 person의 타입은 클래스 Person일 수도 있고,
const person: Person = new Person('changseon');
// 인터페이스 자체를 타입으로 할 수도 있다. (어떤 속성과 메서드를 받을 것이냐에 따라 정하면 된다.)
const person: IPerson = new Person('changseon');

person.hello();
person.hi();
```

### interface extends interface

```ts
interface Person {
  name: string;
  age?: number;
}

interface Korean extends Person {
  city: string;
}

const k: Korean = {
  name: 'changseon',
  city: 'seoul',
};
```

## Class

### 클래스 만들기

1. 생성자 함수가 없으면, 디폴트 생성자가 불린다.
2. 클래스의 프로퍼티 혹은 멤버 변수가 정의되어 있지만, 값을 대입하지 않으면 undefine 이다.

   - 오브젝트에 프로퍼티가 아예 존재하지 않는다.

3. 접근제어자(Access Modifier)는 public이 디폴트이다.

### 클래스와 프로퍼티

1. 클래스의 프로퍼티를 선언과 동시에 값을 할당하는 방법도 있다.
2. 생성자가 불리기 전에 이미 프로퍼티의 값이 저장되어 있음을 알 수 있다.

### 클래스와 프로퍼티의 접근 제어자

1. private으로 설정된 프로퍼티는 dot(.)으로 접근할 수 없다.
2. 클래스 내부에서는 private 프로퍼티를 사용할 수 있다.
3. private이 붙은 변수나 함수는 `_`를 이름앞에 붙이는데, 이는 문법이 아니라 널리 쓰이는 코딩 컨벤션이다.
4. 부모에서 private으로 설정된 프로퍼티는 상속을 받은 자식에서도 접근할 수 없다.
5. 부모에서 protected로 설정된 프로퍼티는 상속을 받은 자식에서 접근이 가능하다.
6. 상속을 받은 자식 클래스에서 부모 클래스에 this를 통해 접근하려면, 생성자에서 `super()`를 통해 초기화 해줘야 한다.

### 클래스와 메서드

1. 클래스 내부에 작성된 메서드는 public이 디폴트
2. arrow function으로 작성 가능
3. private을 붙이면 클래스 외부에서 접근 불가

### 클래스와 상속

1. 상속은 `extends` 키워드를 이용한다.
2. 자식 클래스에서 디폴트 생성자는 부모의 생성자와 입력 형태가 같다.
3. 생성자를 정의하고 this를 사용하려면 super를 통해 부모의 생성자를 호출해줘야 한다.
4. super를 호출할때는 부모 생성자의 입력 타입이 같아야 한다.
5. super를 호출하는 것은 클래스 외부에서 호출하는 것과 같다.
6. protected 함수를 호출해서 그 안의 private을 출력하는 것에 주의한다.

### 클래스와 private constructor

1. 생성자 함수 앞에 접근제어자인 private을 붙일 수 있다.
2. 외부에서 인스턴스 생성이 불가능하다.
   - 싱글톤 패턴으로 인스턴스는 내부에서 생성하고, 인스턴스를 생성하는 메서드를 public static으로 열어서 외부에서 생성한다.

### 클래스와 싱글톤 패턴

1. private 생성자를 이용해서 내부에서만 인스턴스 생성이 가능하도록 함.
2. public static 메서드를 통해 private static 인스턴스 레퍼런스를 획득한다.
3. Lazy Loading(Lazy Initialization): 최초 실행시가 아니라 사용시에 할당을 한다.

```ts
class Preference {
  public static Instance: Person = null;

  public static getInstance(): Person {
    if (Person.Instance === null) {
      Person.Instance = new Person();
    }
    return Person.Instance;
  }

  private constructor() {}

  hello() {}
}

const p = Person.getInstance();
p.hello();
```

### 클래스와 readonly

1. private readonly로 선언된 경우, 생성자에서는 할당이 가능하다.
2. private readonly로 선언된 경우, 생성자 이외에서는 할당이 불가능하다.
3. public readonly로 선언된 경우, 클래스 외부에서는 다른값을 할당할 수 없다.
4. 마치 getter만 있는 경우와 같다.

## Generic

### basic generic

1. Generic 타입을 쓰지 않으면, T로 추론
2. Generic 타입을 쓰며, T를 확인

```ts
function hello<T>(message: T): T {
  return message
}

console.log(hello<string>('hello));
let age = hello(29);
hello<number>('29');  // type error
```

### Generic Class

1. 명시적으로 제네릭 타입을 설정하면 오류가 난다.

```ts
class Person<T> {
  private _name: T;
  private _age: number;

  constructor(name: T) {
    this._name = name;
  }
}

new Person('cs'); // ok
new Person<string>(29); // type error
```

### Generic with extends

1. T가 string 또는 number를 상속받기 때문에 boolean은 안된다.

```ts
class Person<T extends string | number> {
  private _name: T;
  private _age: T;

  constructor(name: T) {
    this._name = name;
  }
}

new Person('cs'); // ok
new Person(29); // ok
new Person(true); // type error
```

### Generic with Multiple types

```ts
class Person<T, K> {
  private _name: T;
  private _age: K;

  constructor(name: T, age: K) {
    this._name = name;
    this._age = age;
  }
}

new Person('cs', 29); // ok
```

### type lookup system

```ts
interface Person {
  name: string;
  age: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setProterty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const person: Person = {
  name: 'cs',
  age: 29,
};

getProperty(person, 'name'); // ok
getProperty(person, 'name1'); // error (해당 키를 찾을 수 없음)

setProperty(person, 'name', 'changseon'); // ok
setProperty(person, 'name1', 'changseon'); // error (해당 키를 찾을 수 없음)
```

## iterator

### for..of

- es3
  - `for(var i=0; i < array.length; i++)`
- es5
  - `array.forEach`
    - 단점: return으로 순회를 탈출할 수 없다.
- es6
  - `for(const item of array)`
    - 원칙적으로는 배열에서만 사용 가능하다.
    - 객체를 순회할 때
      - `for(const prop of Object.keys(obj))` 도 사용할 수 있다.

### for..in

- 배열을 순회할 때는 사용하지 않을 것
  - index가 number가 아니라 string으로 나온다.
  - 배열의 프로퍼티를 순회할 수도 있다.
  - prototype 체인의 프로퍼티를 순회할 수도 있다.
  - 루프가 무작위로 순회할 수도 있다.
  - for..of를 쓸 것

### Symbol.iterator

- 프로퍼티이며, 함수가 구현되어 있으면 iterable이라고 한다.
- Array, Map, Set, String, int32Array, Uint32Array, etc. 에는 내장된 구현체가 있으므로 이터러블 하다.
- 그냥 객체는 이터러블하지 않다.
- 이터레이터를 통해 이터러블한 객체의 Symbol.iterator 함수를 호출한다.
- target이 es3 or es5
  - Array 에만 for..of 사용 가능
  - 일반 객체에 사용하면 에러
- target이 es6
  - Symbol.iterator 함수를 직접 구현하면 어떤 객체에도 for..of 사용가능

```ts
// custom iterable example

class CustomIterable implements Iterable<string> {
  private _array: Array<string> = ['first', 'second'];

  [Symbol.iterator]() {
    var nextIndex = 0;

    return {
      next: () => {
        return {
          value: this._array[nextIndex++],
          done: nextIndex > this._array.length,
        };
      },
    };
  }
}

const cIterable = new CustomIterable();

for (const item of cIterable) {
  console.log(item); // 'first'\n'second'
}
```
