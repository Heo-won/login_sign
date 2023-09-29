import React, { useState } from "react";
import axios from "../api/instance";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from "styled-components";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const nicknamePattern = /\d{4,}/;
    const usernamePattern = /^[a-zA-Z0-9_]{5,}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nickname.match(nickname)) {
    }
    if (!username.match(usernamePattern)) {
      errors.username =
        "* 아이디는 영문, 숫자로 구성되어야 하며 6자 이상이어야 합니다.";
    }
    if (!password.match(passwordPattern)) {
      errors.password =
        "* 비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 모두 포함하며 8자 이상이어야 합니다.";
    }
    if (!password.match(passwordConfirm)) {
      errors.passwordConfirm = "* 비밀번호가 서로 다릅니다.";
      return errors;
    }
    if (!email.match(emailPattern)) {
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 여기에서 서버로 회원가입 요청을 보내는 코드를 작성!!
        const response = await axios.post(
          "/api/users/signup",
          {
            username,
            email,
            nickname,
            password,
          }
          // {
          //   headers: {
          //     "Content-Type": "application/json",
          //     // 'Accept': 'application/json',
          //   },
          // }
        );
        console.log("새로운 회원가입이 발생하였습니다 ->", response);
        setUsername(response.data.username);
        setNickname(response.data.nickname);
        setPassword(response.data.password);
        setPasswordConfirm(response.data.passwordConfirm);

        if (response.status === 200) {
        }
        // 회원가입이 성공하면 다음 페이지로 이동.
      } catch (error) {
        console.error("회원가입 에러:", error);
        alert(error.response.data.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <MainSignupContainer>
      <SignupContainer>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>닉네임</Label>
            <Input
              type="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          {errors.username && <Error>{errors.username}</Error>}

          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          {errors.password && <Error>{errors.password}</Error>}

          <FormGroup>
            <Label>
              비밀번호 <br /> 확인
            </Label>
            <Input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </FormGroup>
          {errors.passwordConfirm && <Error>{errors.passwordConfirm}</Error>}

          <Button type="submit">가입하기</Button>
        </form>
      </SignupContainer>
    </MainSignupContainer>
  );
}

const MainSignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

const SignupContainer = styled.div`
  text-align: center;
  max-width: 300px;
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
  margin-bottom: 30px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  display: block;
  margin: 0 10px 10px 0;
  width: 100px;
  text-align: right;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  margin: 0 10px 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Error = styled.p`
  color: #0d00ff;
  font-size: 11px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #e31e1ef8;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  width: auto;
  margin-top: 10px;

  &:hover {
    background-color: #b30000;
  }
`;

export default Signup;
