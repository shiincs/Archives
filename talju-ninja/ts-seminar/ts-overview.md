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
