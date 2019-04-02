# Redux: Supplying the Initial State

이전에 지속 된 state로 Redux 응용 프로그램을 시작하는 방법과
Reduce 응용 프로그램이 reducers에서 지정한 inital State와 병합하는 방법을 배웁니다.

## Transcript

Redux store를 만들 때 inital State는 rootReducer에 의해 결정됩니다.
우리의 경우 rootReducer는 todos와 visibilityFilter에 결합 된 reducer를 호출 한 결과입니다.

reducer는 자율적이기 때문에, 그들 각각은 state 인수의 기본값으로 자신의 inital State를 지정합니다,
그것은 todos reducer에 대한 빈 배열이고, 그것은 visibilityFilter reducer에 대한 모든 문자열입니다.

결합 된 reducer의 inital State는 todos 키 아래에 빈 배열을 포함하는 객체가되고,
visibilityFilter 키 아래에 모든 문자열을 표시합니다.
이것이 store의 inital State가 될 것이므로 등급을 매긴 직후 store의 현재 state를 기록하면 콘솔에 객체가 표시됩니다.

때로는 앱 실행 전에 일부 기존 데이터를 동기적으로 앱에 로드하려고합니다.
예를 들어, 우리는 이전 세션의 남아있는 todos를 가질 수 있으며,
시작하기 바로 전에이 state 조각들를 앱에 로드하려고 할 수 있습니다.

Redux를 사용하면 creatreStore 함수의 두 번째 인수로 지속성 state를 전달할 수 있으며,
이 값은 reducers가 지정한 값보다 우선합니다.
새로 고침하면 todos 배열에 지정된 하나의 항목이 있음을 알 수 있습니다.

그러나 visibilityFilter 값은 여전히 ​​존재하며, reducer에 의해 특정된 default value 값입니다.
이것은 persistedState의에 작성되어있지 않기 때문에 reducer가 이를 제어합니다.

왜 이런 일이 발생하는지 다시 한번 살펴 보겠습니다.
두 번째 인수로 store을 생성하기 위해, 전달하는 모든 값은 정의되지 않은 state 인수 대신 루트 reducer에서 끝납니다.

결합 된 reducer의 구현은 state의 일부를 해당 reducer에 해당 이름으로 전달합니다.
따라서 todos reducer가 정의되지 않은 대신 처음으로 호출 될 때 키 todos가 있는
persistedState의 일부가 state 객체로 끝나는 이유가 여기에 있습니다.

state가 정의되지 않았으므로 기본 인수 구문은 아무 효과가 없으므로,
state는 하나의 항목이있는 배열로 유지됩니다.
Redux는 store를 초기화 할 때 사용자 지정 작업 유형과 일치하지 않는 작업을 보냅니다.

reducer는 기본 케이스로 넘어가 받아받은 state를 반환 할 것이고,
이 경우이 state 객체는 여기서 제공 한 항목이 하나있는 배열입니다.

그러나 visibilityFilter 키는 영속 state 개체에 존재하지 않으므로
부모 축소 기는 정의되지 않은 state를 보고
state 인수로 undefined를 visibilityFilter reducer로 전달합니다.

수신하는 state는 정의되어 있지 않으므로 ES6 기본 인수 구문에 지정된대로 기본 인수를 사용합니다.
todos reducer 내부와 마찬가지로 작업 유형은 알려진 작업 유형과 일치하지 않으므로 기본 사례 및 반환 state로 넘어갑니다.

그러나 이 경우 처음에는 state가 정의되지 않았기 때문에 state가 모두 표시되도록 초기화되었으므로 ES6 기본 인수 구문이 시작되었습니다.
이는 결합 된 reducer가 우리가 제공 한 두 가지 toos를 모두 포함하는 inital State를 반환 한 이유를 설명합니다.
reducer에서 기본적으로 제공하는 visibilityFilter

앱의 모든 inital State 트리를 단일 장소에 지정하고 상점을 생성하기 위해 전달하려고 할 수도 있지만 권장하지 않습니다.
inital State를 reducer 정의와 함께 배치하면 테스트하고 변경하기가 쉽기 때문에 항상 그렇게하려고 노력해야합니다.

그러나 두 번째 인수를 사용하여 store에 지속성 데이터를 저장하는 store를 만들 수 있습니다.
Redux 자체에서 가져 왔기 때문에 store에 캡슐화를 중단하지 않기 때문입니다.
