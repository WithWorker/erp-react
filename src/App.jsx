import { Route, Routes, BrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login"
import HomePage from "./components/pages/home/HomePage"
import Find from "./components/auth/Find"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" exact={true} element={<Login />}/>
          <Route path="/find" element={<Find />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
