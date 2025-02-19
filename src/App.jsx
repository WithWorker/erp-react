import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginPage from "./components/auth/LoginPage"
import HomePage from "./components/pages/home/HomePage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" exact={true} element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
