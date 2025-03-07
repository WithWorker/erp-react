## React Hook
- React Hook은 리액트 클래스형 컴포넌트에서 이용하던 코드를 함수형 컴포넌트에 맞게 만들어졌습니다.
- 반복문이나 조건문 혹은 중첩된 함수 내에서 Hook을 호출하면 안된다.
- useState : 상태를 관리하는 Hook
- useEffect : ActionListener와 같은 역할을 하는 Hook으로 의존성 배열에 해당값이 변할 때마다 함수가 실행된다.
- useLocation : pathname(현재URL), search(쿼리스트링), hash(#해시), state(상태전달)

<br />

## Redux
- Redux를 사용하기 위해 먼저 config.js에 rootReducer와 store를 정의해야 합니다.
- rootReducer는 reducer를 하나의 상태 객체로 병합할 수 있게 합니다.
- 각 컴포넌트의 상태값들은 이렇게 관리되는 reducer를 통해서 업데이트를 진행합니다.
- 상태값을 조회할 때는 useSelector를 사용하고,
- 상태값 변경을 요청할 때는 useDispatch를 사용합니다.
- Dispatch를 사용할 때는 어떤 요청을 보낼지 type을 정해야 합니다.
