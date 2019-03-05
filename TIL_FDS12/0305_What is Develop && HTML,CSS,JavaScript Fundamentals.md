# What is Develop?

### 웹 프로그래밍?

- 웹을 통해 이용하는 프로그램을 만든다.

### 네트워크

- LAN(Local)
- WAN(Wide) - LAN 끼리 연결된 것

### 시작과 끝

1. 브라우저 요청
2. Hosts 파일 검색
3. DNS 서버 검색
4. 해당 주소로 연결

### How to

- http = Scheme(어떻게)
- logo-logos.com = Host(어디에)
- Google_icon_logo.png = Path(무엇을)

### 프로토콜

1. HTTP - 암호화 X
2. HTTPS - 암호화 O 
   - 해당 사이트가 제공하는 공개키(인증서)를 다운받아서 이용자가 어떤 정보를 입력했을 때 공개키로 암호화 해서 보낸다.
3. Mailto
4. FTP(File Transfer Protocol)

`<scheme>://<name>:<pwd>@<host>:<port>/<path>;<parameter>?<query>#<fragment>`

- URI(Uniform Resource Identifier) - 가상 경로를 이용해서 내부 구조를 감춘다. (유니크)
  - URL(Uniform Resource Locator) - 요새는 잘 안쓰는 추세(변하기 때문에 유니크X)
  - URN(Uniform Resource Name)

### HTTP

HyperText Transfer Protocol - 1989년 3월 `팀 버너스 리`

HyperText : 문서와 문서가 연결되어 있는 것

### Media Type

- MIME
  - 이메일 전송 표준 프로토콜 Content Type은 HTTP에서도 사용

### Method

- GET : 리소스 획득
- PUT : 리소스 저장 (파일 전송 시에 주로 사용하는 메서드)
- DELETE : 리소스 삭제
- POST : 데이터 전송
- HEAD : HTTP 헤더 획득

### 통신

- HTTP : 애플리케이션 계층
- TCP : 전송 계층(데이터 손실 X) / UDP : 일부 데이터 손실 가능(그래서 빠르다)
- IP : 네트워크 계층

### Server의 구성

- Web Server
- DB Server
- Image Server
- Cache Server - 예를 들면 CDN



# HTML / CSS / JavaScript

### HTML (HyperText Markup Language)

마크업(Markup)과 마크다운(MarkDown)의 차이

--> 마크업은 **의미가 있는** 단어를 가지고 태그를 만든다. (태그 이름으로 기능을 유추할 수 있다.)

--> 마크다운은 **의미가 없는** 단어를 가지고 만든다.

### CSS (Cascading Style Sheets)

CSS2에서 CSS3로 발전하면서 JavaScript의 기능을 일부 흡수한다.

### JavaScript

넷스케이프의 브랜던 아이크에 의해 만들어졌다.

1995년 12월 넷스케이프에서 채택(자바스크립트 해석기를 넷스케이프에 달았다.)

자바스크립트 해석기는 브라우저마다 다르기 때문에 실제 브라우저에서 자바스크립트가 다르게 동작할 수 있고, 성능도 차이가 날 수 있다.

### jQuery

2006년 존 레식 발표

자바스크립트의 크로스브라우징 이슈를 통합해서 해결해준다.

### Framework

> 소프트웨어의 구체적인 부분에 해당하는 설계와 구현을 재사용이 가능하게끔 일련의 협업화된 형태의 클래스들을 제공하는 것.
>
> -- Ralph Johnson