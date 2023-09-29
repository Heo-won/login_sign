import React, { useState } from "react";
import axios from "../api/instance";
import styled from "styled-components";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useState 를 사용한 상태관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!username.length === 0) {
      errors.username = "*사용자 이름을 입력하세요.";
    }

    if (!password.length === 0) {
      errors.password = "*비밀번호를 입력하세요.";
    }

    return errors;
  };

  // 토큰을 로컬스토리지에 저장
  const setToken = (token) => {
    localStorage.setItem("Authorization", token);
  };

  const getToken = () => {
    return localStorage.getItem("Authorization");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 여기에서 서버로 로그인 요청을 보내는 코드를 작성하기!.
        const response = await axios.post("/api/users/login", {
          username,
          password,
        });

        console.log(response.statusText, response);
        if (response.status === 200) {
          setToken(response.headers.authorization); // 서버에서 토큰 받기
          // setToken(response.data.token); // 로그인이 되면 토큰 받기
          setIsLoggedIn(true); // 로그인 성공 시 상태 변경
        }

        // 로그인이 성공하면 다음 페이지로 이동
      } catch (error) {
        console.error("로그인 에러:", error);
        // 로그인 실패 시 띄울 수 있는 오류메세지.
        setErrors({
          general:
            "*로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.",
        });
        // console.log(Object.keys(validationErrors).length);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("Authorization"); // 토큰 제거
    setIsLoggedIn(false); // 상태 변경
  };

  return (
    <MainLoginContainer>
      <LoginContainer>
        {isLoggedIn ? ( // isLoggedIn 상태에 따라 로그인 또는 로그아웃 버튼 표시
          <>
            <Title>로그아웃</Title>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Title>로그인</Title>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>아이디</Label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ID : "
                  required
                />
                {errors.username && <Error>{errors.username}</Error>}
              </FormGroup>
              <FormGroup>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PW : "
                  required
                />
                {errors.password && <Error>{errors.password}</Error>}
              </FormGroup>
              {errors.general && <Error>{errors.general}</Error>}
              <Button type="submit">로그인</Button>
            </form>
          </>
        )}
      </LoginContainer>
    </MainLoginContainer>
  );
}

const MainLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;
const LoginContainer = styled.div`
  text-align: center;
  max-width: 300px;
  width: 300px;
  height: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin: 0 10px 5px 0;
  width: 100px;
  text-align: right;
`;

const Input = styled.input`
  width: 180px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0 18px 5px 0;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #e31e1ef8;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  margin-bottom: 30px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #b30000;
  }
`;

export default Login;
