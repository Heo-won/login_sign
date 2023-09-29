import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import LoginBox from "./component/LoginBox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<LoginBox />} />
        {/* <SignIn /> */}
        <Route path="/signup" element={<Signup />} />
        {/* <Login /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
