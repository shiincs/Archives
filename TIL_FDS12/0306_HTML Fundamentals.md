# HTML Fundamentals

HTML 표준안은 W3C에서 관리한다. --> But, 브라우저는 제작사에 따라 다르게 구현된다.



### SEO (Search Engine Optimization)

HTML 문서가 구조화되어 있는 이유는 웹 브라우저가 잘 해석하기 위함이다.

--> 즉, 웹 브라우저에서 요구하는 사항을 충족해줘야 검색 엔진에서 검색이 잘 된다.

### HTML 구성

```html
<!-- HTML 문서의 시작을 알리는 태그 -->
<html>
  <!-- 눈에 보이지 않는 영역, 웹페이지의 정보를 담는다. -->
  <head>
      
  </head>
  <!-- 실제 이용자에게 보여지는 컨텐츠 영역 -->
  <body>
      
  </body>
</html>
```

### 태그 구분

- Container Tag
  - 여는 태그와 닫는 태그 쌍으로 이루어진다. 
  - 태그 안에 내용을 넣을 수 있다.
- Empty Tag
  - 열고 닫는 쌍이 아닌, 단일 태그로 이루어진다.

### 디스플레이 타입

- inline
  - 한 줄에 여러 개의 요소가 같이 있을 수 있다. 크기를 지정할 수 없다.
- block
  - 한 줄에 하나의 요소만 들어간다. 크기를 지정할 수 있다.
- inline-block
  - 인라인 요소를 크기를 지정해서 사용할 수 있다.

### 주요 태그

| 태그  | 설명                                       | 타입      | 디스플레이 타입 |
| ----- | ------------------------------------------ | --------- | --------------- |
| html  | 문서의 시작                                | Container | block           |
| head  | 문서 정보 블록 title, meta, link 등을 포함 | Container | none            |
| body  | 렌더링될 영역의 시작                       | Container | block           |
| table | 표 thead tbody th tr td 등 포함            | Container | block           |
| div   | Division 공간                              | Container | block           |
| h1    | Heading 제목                               | Container | block           |
| a     | Anchor 링크                                | Container | inline          |
| p     | Paragraph 문단                             | Container | block           |
| ul    | Unordered List li 포함                     | Container | block           |
| ol    | Ordered List li 포함                       | Container | block           |
| img   | 이미지 태그                                | Empty     | inline          |
| embed | 다른 플로그인 로드 태그                    | Empty     | inline          |
| form  | 입력 태그 input textarea 등                | Container | block           |

### 속성값

- `data-<이름>` : 커스텀 속성값

### 주요 속성값

| 태그   | 설명                          | 관련 태그                                |
| ------ | ----------------------------- | ---------------------------------------- |
| id     | 태그 고유 식별자              | 모든 태그                                |
| class  | 태그 그룹 식별자              | 모든 태그                                |
| name   | 태그 식별 문자열              | form, iframe, input 등                   |
| style  | 렌더링 시 스타일 지정         | 모든 태그                                |
| width  | 너비                          | block, inline-block 태그                 |
| height | 높이                          | block, inline-block 태그                 |
| type   | 형태 지정                     | input, link, script, style               |
| href   | HyperText Reference 링크 주소 | a, link                                  |
| value  | 값                            | input, option                            |
| src    | source 대상 파일의 주소       | img, video, audio, embed, iframe, script |

### doctype

- HTML5 - `<!doctype html>`

- HTML4, XHTML - `<!DOCTYPE HTML PUBLIC "">`
  - Strict : HTML4의 정해진 양식을 벗어나면 브라우저에서 에러 뿜뿜
  - Transitional : 하위 버전을 지원한다.
- ,doctype 없을 경우 HTML4 보다 낮은 버전으로 인식한다

### 태그 종류

1. `<html>`
   - `<html lang="ko">`
   - 사용할 언어 ISO 코드
   - 특정 언어 제한 검색
   - 화면 낭독기의 발음 억양 등을 위해서 설정한다. (웹 접근성 향상)



