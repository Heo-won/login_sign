/**
 * @author : Goya Gim
 */

export const setToken = (token) => {
  sessionStorage.setItem("Authorization", token);
};

export const getToken = () => {
  return sessionStorage.getItem("Authorization");
};

// 토큰으로 로그인 여부확인
// 없으면 로그인창 띄우기
// post요청으로 로그인
// 서버에서 유저가 있는지 확인
// 로그인이 되면 토큰 받기
// 토큰을 세션스토리지에 저장
// 세션 스토리지에 저장한 토큰을 로직앞에 뿌ㄹㅕ서 헤더로 전달해주기.
