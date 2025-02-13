import { Route, Routes } from "react-router" 
import MainPage from "./components/pages/main/MainPage";
import LoginPage from "./components/auth/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" exact={true} element={<MainPage />}/>
          <Route path="/login" exact={true} element={<LoginPage />}/>
      </Routes>
    </>
  );
}

export default App;
/*
  - http://localhost:3000/index.html
  - <div id="root"></div>
  - root에 대한 정보는 index.js에서 참조 한다.
  document.querySelector("#root")
  - index.js에서 App import한다
  - App.jsx의 return에 있는 태그가 화면 출력된다.
  - 그런데 이번에는 App.jsx에 메뉴를 클릭했을 때 보여줄 페이지에
  대한 링크를 걸어 준다.
*/