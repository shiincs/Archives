# 22. Extracting Container Components (FilterLink)

이전 강의에서, 우리는 메인 컨테이터 컴포넌트로부터 프레젠테이셔널 컴포넌트들을 분리했습니다. `TodoApp` 컴포넌트는 버튼이 클릭되거나, 아이템이 추가되거나, 필터가 적용될 때의 동작에 대해 지정했습니다. `AddTodos` , `Footer`, `TodoList` 등의 개별적인 프레젠테이셔널 컴포넌트들은 액션을 디스패치 하지않고, 대신 props 에서 그들의 콜백 함수를 호출합니다. 그러므로, 그것들은 오직 동작이 아닌 보여지는 것에만 책임을 갖습니다.

이러한 접근의 단점은 중계하는 컴포넌트들이 그것들을 실제로 사용하지 않음에도 불구하고 너무 많은 prop 들이 트리를 따라서 전달되어야 한다는 것입니다.

예를들어, `FilterLink` 컴포넌트는 현재 필터를 알고 있어야만 그게 활성화 되었을 때 모양을 바꿀 수 있습니다. 그러나 현재 필터를 받기 위해 맨 위에서부터 prop을 전달받아야 합니다. 이는 `Footer`가 `FilterLink`에 넘겨주기 위해 ` visibilityFilter`를 받아야만 하는 이유입니다.

부모 컴포넌트들은 자식 컴포넌트들이 필요로하는 데이터에 대해 너무 많은 것을 알아야하기 때문에 이러한 방식은 캡슐화를 깨는 것입니다. 이를 고치기 위해, 우리는 컨테이너 컴포넌트를 더 추출할 것입니다.

### `Footer` 컴포넌트를 추출

현재 `Footer` 컴포넌트는 `visibilityFilter`와 `onFilterClick()` 콜백을 props로 받지만, 그 둘 중 어떤것도 이용하지 않습니다. 그것은 단지 `FilterLink`에 내려주고만 있습니다. 이는 두 props를 제거함으로써 단순화시킬 좋은 기회입니다. 우리는 `Footer` 컴포넌트가 props의 값들에 대해 신경쓰지 않고 `FilterLink`에 내려주기 위해서만 존재한다는 것을 알고 있을 때에만 단순화 할 수 있습니다.

우선 `Footer` 컴포넌트로부터 props 정의를 제거하면서 시작합니다. 그리고 그것들을 `FilterLink`에서도 제거합니다.

```jsx
const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
)
```

### `FilterLink` 리팩토링

`FilterLink` 컴포넌트 선언의 내부에서, 현재 우리는 링크의 클릭에 대한 동작을 지정해주지 않습니다. 그것은 또한 현재의 `filter` 에 대해서도 알아야 아이템을 적절하게 렌더링 할 수 있습니다. 이처럼 `FilterLink`는 동작으로부터 분리되지 않았기 때문에 프레젠테이셔널 컴포넌트라고 할 수 없습니다.  유일하게 납득이 가는 동작은 클릭 했을 때 `SET_VISIBILITY_FILTER` 액션을 디스패치하는 것입니다. 이는 렌더링을 담당하는 프레젠테이셔널 컴포넌트와 함께 로직을 관리하기 위해서 컨테이너 컴포넌트로 감싸면서 더 정교하게 프레젠테이셔널 컴포넌트로 나누기 위한 좋은 기회입니다.

그러므로, 우리는 현재의 `FilterLink`를 프레젠테이셔널 컴포넌트인 `Link`로 바꾸면서 시작할 것입니다.

새로운 `Link` 프로젠테이셔널 컴포넌트는 filter 에 대해 어떤 것도 알지 못합니다. 그것은 오직 `active` prop과 `onClick` 핸들러의 호출만 받습니다. `Link` 는 오직 렌더링에만 관심을 둡니다.

```jsx
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
```

### 새로운 `FilterLink` 컴포넌트

새로운 `FilterLink`는 스토어의 현재 데이터를 가지고 `Link` 컴포넌트를 렌더링하는 클래스가 될 것입니다. 이것은 컴포넌트의 props와 state를 읽을 것입니다. (주의: 여기서의 상태는 리액트의 state를 말하는 것이 아니라 `store.getState()`를 해서 가져오는 리덕스 스토어의 state를 의미합니다.)

컨테이터 컴포넌트로서 `FilterLink`는 자체적인 마크업을 가지고 있지 않고, 렌더링을 `Link` 라는 프레젠테이셔널 컴포넌트에 위임합니다. 예제에서, 이 컴포넌트는 자신의 `filter` prop과 리덕스 스토어의 state의 `visibilityFilter`를 비교함으로써 자신의 `active` prop을 계산합니다.

`filter` prop은 `Footer`로부터 `FilterLink`에 전달되는 것 중 하나입니다. 현재 선택된 visibility filter인 `visibilityfilter`는 리덕스 스토어의 state에서 관리됩니다. 만약 그것들이 일치한다면 우리는 링크가 active 한것 처럼 보이기를 원합니다.

컨테이너 컴포넌트는 동작을 지정할 필요가 있습니다. 예제에서, `FilterLink` 컴포넌트는 특정 `Link` 컴포넌트가 클릭되었을 때 props로 받은 `filter` props와 함께 `SET_VISIBILITY_FILTER` 타입의 액션을 디스패치 해야한다는 것을 지정합니다.

`FilterLink` 컴포넌트는 `Link` 컴포넌트의 내용으로 사용될 children을 받을 것입니다. 따라서 우리는 `Link` 컴포넌트에 `<a>` 태그 내부에서 렌더링 될 children을 넘겨줄 것입니다.

```jsx
class FilterLink extends Component {
  render () {
    const props = this.props;
    // this just reads the store, is not listening
    // for change messages from the store updating
    const state = store.getState();

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}
```

### `FilterLink`에 대한 문제들

`FilterLink` 컴포넌트의 수행(동작)에 작은 문제가 있습니다. `render()` 메서드 내부에서 리덕스 스토어의 현재 `state`를 읽습니다. 그러나 그것은 스토어를 구독(subscribe) 하지는 않습니다. 따라서 스토어가 업데이트 될 때 부모 컴포넌트가 업데이트 되지 않는다면 올바른 값이 렌더링되지 않을 것입니다.

또한, 우리는 현재 state가 바뀔 때 전체 애플리케이션을 리렌더링 하고 있고, 이는 전혀 효율적이지 않습니다. 이후에, 우리는 스토어에 대한 구독을 컨테이너 컴포넌트들의 라이프사이클 메서드로 옮길 것입니다.

리액트는 컴포넌트에게 리렌더링 하도록 강요하는 특별한 `forceUpdate()` 메서드를 제공합니다. 우리는 그것을 `store.subscribe()` 메서드와 조합해서 사용할 수 있습니다. 그렇게 함으로써 스토어가 변할 때마다 컨테이너 컴포넌트가 업데이트 되도록 강요할 수 있습니다.

`FilterLink` 컴포넌트에 이렇게 작성합니다.

```jsx
class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  // Since the subscription happens in `componentDidMount`,
  // it's important to unsubscribe in `componentWillUnmount`.
  componentWillUnmount() {
    this.unsubscribe(); // return value of `store.subscribe()`
  }
.
. // `render()` method as above...
.
```

### 정리

(생략)

