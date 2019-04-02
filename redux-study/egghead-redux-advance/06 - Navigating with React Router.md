# 06. Navigating with React Router

```js
// Root.js
<Route path="/:filter?" component={App} />
```

> v.4 이상에서는 (:filter) 대신 :filter? 로 표기합니다.

_00:00_

`visibility filter`를 컨트롤하는 링크들은 현재 진짜 링크와 같은 동작을 하지 않고 있습니다. 저는 링크를 클릭하고 목록이 필터릴 됐을 때 url 주소가 업데이트 되도록 하고 싶습니다.

_00:16_

`route`컴포넌트에 `filter`라는 매개변수(param)를 추가할 것이고, filter `param`을 괄호로 묶어 param이 옵션임을 명시합니다. `param`을 설정하지 않았을 때 모든 할 일 목록을 보여주기 위함입니다.

```js
// Footer.js
const Footer = () => (
  <p>
    {/* before => <FilterLink filter="SHOW_ALL">All</FilterLink> */}
    Show: <FilterLink filter="all">All</FilterLink>
    {", "}
    <FilterLink filter="active">Active</FilterLink>
    {", "}
    <FilterLink filter="completed">Completed</FilterLink>
  </p>
);
```

_00:28_

이제 link들이 있는 footer 컴포넌트를 엽니다. 지금은 filter prop을 주기 위해 임의의 관습을 사용하고 있습니다. 이제는 제가 보여주고자 하는 필터링과 비슷하게 이를 바꾸기위해 `active`와 `completed`경로를 사용하고, 빈 문자열을 `default`경로로 사용할 것입니다.

```js
// FilterLink.js
function FilterLink({ filter, children }) {
  return (
    <Link
      to={filter === "all" ? "" : filter}
      activeStyle={{
        textDecoration: "none",
        color: "black"
      }}
    >
      {children}
    </Link>
  );
}
```

_00:52_

현재의 filter link 컴포넌트는 매 클릭마다 `action`을 보내고, `filter prop` 과 store 안에 있는 `visibility filter`를 비교하여 `active` 상태를 읽습니다.

_01:06_

하지만 react router 모듈로부터 `Link` 컴포넌트를 import 하면 router가 url을 통해 상태를 컨트롤할 수 있기 때문에 이런 방식(구현)은 필요 없습니다.

_01:24_

우리가 원하는 `filter`와 경로는 일치합니다. `filter`는 react router가 prop으로 제공하고, link 컴포넌트를 렌더링 합니다. 만약 모든 할 일 목록을 보여주는 `filter`를 원한다면 기본 경로를 사용하면 되고, 다른 `filter`들은 해당 filter를 경로에 `param`으로 입력하면 됩니다.

_01:43_

또한 `activeStyle`속성을 부여하여 현재 prop과 경로가 일치하면 link에 style이 다르게 표시될 것입니다. 마지막으로, `children`속성을 받아 (텍스트로) 표시할 것입니다.

_02:02_

이제 `set visibility filter action-creator`는 더이상 필요가 없으므로 삭제합니다. react-router의 link 컴포넌트가 있기 때문에 임의로 작성한 Link 컴포넌트 또한 삭제합니다.

_02:19_

이제 app을 실행하고, footer의 link를 클릭하면 url이 업데이트 됩니다. 뒤로 앞으로 버튼을 눌러도 이 링크는 활성화됩니다.