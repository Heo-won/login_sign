import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

function LoginBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLoginModal = (e) => {
    e.stopPropagation();
    setIsRegisterOpen(true);
  };

  const openRegisterModal = (e) => {
    e.stopPropagation();
    setIsRegisterOpen(true);
  };

  // 모달 외부 클릭 시 닫힘
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <ModalButton onClick={openModal}>열기</ModalButton>
      {isModalOpen && (
        <ModalContainer onClick={handleModalClick}>
          <ModalContent>
            <ModalTitle></ModalTitle>
            <ModalButtons>
              <Button onClick={openLoginModal}>로그인</Button>

              <Button onClick={openRegisterModal}>회원가입</Button>
              <Button>카카오</Button>
            </ModalButtons>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
}

const ModalButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  height: 200px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 50px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export default LoginBox;
