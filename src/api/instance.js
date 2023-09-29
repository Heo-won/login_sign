import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.123.127:8080/",
  headers: {
    // "Content-Type": "application/json",
    // withCredentials: true, // CORS에러
  },
});

export default instance;
