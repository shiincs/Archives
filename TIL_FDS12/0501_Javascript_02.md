---
title: '자바스크립트 실행 환경 / 웹 브라우저는 어떻게 동작하는가? / 자바스크립트는 어떻게 동작하는가?'
date: 2019-05-01 13:00:00 +0900
tags:
  - FDS12
  - JavaScript
comments: true
---

# 자바스크립트 실행 환경

- Node.js는 언어가 아니라 환경이다. 서버사이드에서 자바스크립트를 실행시키는 런타임 환경을 말한다.
- 프론트엔드: 클라이언트 사이드 Web API + ECMAScript
- 백엔드: Node.js API + ECMAScript
- ECMAScript는 공통

# 웹 브라우저는 어떻게 동작하는가?

- http: 서버와 클라이언트 간에 데이터를 주고받기 위한 통신 규약
- 파싱(Parsing): 텍스트(문자열)로 이루어진 소스코드의 의미를 해석한다.
- HTML: Load HTML -> Parse HTML -> Create DOM Tree
- CSS: Load CSS -> Parse CSS -> Create CSSOM Tree
- HTML + CSS : Create Render Tree -> Display
- JavaScript: Load JavaScript -> Parse JavaScript -> Create Syntax Tree

- DOM: HTML을 파싱해서 메모리에 올려놓은 결과

# 자바스크립트는 어떻게 동작하는가?

- AST(Abstract Syntax Tree): 추상적 구문 트리
- Token: 의미를 가진 최소한의 단위 (일반적으로 토큰은 ' '로 구분된다)
