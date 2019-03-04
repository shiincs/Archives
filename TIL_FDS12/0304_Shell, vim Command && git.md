# Shell, vim Command && git

## Before Linux

- 1965년 데니스 리치, 켄 톰슨 외 x명이 AT&T Bell 연구소에서 PDP-7 기반 어셈블리어로 작성한 UNIX를 개발
- 1973년 데니스 리치와 켄 톰슨이 C를 개발한 뒤, C 기반 UNIX 재작성
- 1984년 리차드 스톨먼이 오픈 소프트웨어 자유성 확보를 위한 GNU 프로젝트 돌입

### Kernel

![Kernel](https://camo.githubusercontent.com/5135125939bfa0b2b8536f5110550e04fe64545d/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f382f38662f4b65726e656c5f4c61796f75742e7376672f33383070782d4b65726e656c5f4c61796f75742e7376672e706e67)

- 하드웨어와 응용프로그램을 이어주는 운영체제의 핵심 시스템 소프트웨어

### Linux Torvalds

- 헬싱키 대학생이던 리누스 토발즈는 앤디 타넨바움의 MINIX를 개조한 Linux를 발표
- 0.1 - bash(GNU Bourne Again SHell), gcc(UNIX 기반 C 컴파일러)



## Linux

- 리누스 토발즈가 작성한 커널 혹은 GNU 프로젝트의 라이브러리와 도구가 포함된 운영체제
- PC와 모바일, 서버, 임베디드 시스템 등 다양한 분야에서 활용
- Redhat, Debian, Ubuntu, Android 등 다양한 배포판이 존재



## Shell

- 운영체제의 커널과 사용자를 이어주는 소프트웨어
- sh(Bourne Shell): AT&T Bell 연구소의 Steve Bourne이 작성한 유닉스 쉘
- csh: 버클리의 Bill Joy가 작성한 유닉스 쉘(C언어랑 비슷한 모양)
- bash(Bourne Again Shell): Brian Fox가 작성한 유닉스 쉘
  - 다양한 운영체제에서 기본 쉘로 채택
- zsh: Paul Falstad가 작성한 유닉스 쉘
  - sh 확장형 쉘
  - 현재까지 가장 완벽한 쉘

### Shell Command Basic

```bash
$ cd documents

$ mkdir dev # - make directory dev
$ cd dev # - change directory
$ cd .. # - go up

$ ls
$ ls -al

$ touch hello.py # - create hello.py
$ exit # - terminate shell

$ mv hello.py dev
$ cp hello.py dev

$ rm hello.py
$ rm -rf dev/
```



## Vim

### Vim Basic

```bash
[Command List]

h,j,k,l - move cursor
i - insert mode
v - visual mode
d - delete
y - yank
p - paste
u - undo
r - replace
$ - move end of line
^ - move start of line

:q - quit
:q! - quit w/o write(no warning)
:wq - write and quit

:{number} - move to {number}th line
```



## Git

### chronicle of git

- Linux Kernal을 만들기 위해 Subversion을 쓰다 화가 난 리누스 토발즈는 2주만에 git이라는 git 이라는 버전관리 시스템을 만듦

### Characteristics of git

- 빠른 속도, 단순한 구조
- 분산형 저장소 지원
- 비선형적 개발(수천개의 브랜치) 가능

### git inside

- Blob: 모든 파일이 Blob이라는 단위로 구성
- Tree: Blob(tree)들을 모은 것
- Commit: 파일에 대한 정보들을 모은 것

### git process and command

![git process and command](https://camo.githubusercontent.com/6101a2b0f170b0a22db8b1077bfa2c6d7fb172bf/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f4d676156392e706e67)

### set configuration

```bash
최초 한번만 수행하면 된다.

$ git config --global user.name "username"
$ git config --global user.email "github email address"
$ git config --global core.editor "vim"
$ git config --list
```