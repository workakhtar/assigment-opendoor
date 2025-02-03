import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const erroStatus = [401];
    if (erroStatus.includes(error.response.status)) {
      // clearUserCookies();
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  if (Cookies.get("token")) {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
  }

  config.headers['Accept'] = 'application/json';
  return config;
});


export {api};