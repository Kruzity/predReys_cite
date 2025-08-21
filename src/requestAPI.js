import axios from 'axios';
import config from "./config/env.js";

// Конфигурация API клиента
const API = axios.create();

API.interceptors.request.use((config) => {
  let access_token = localStorage.getItem('access_token')
  
  if (!config._retry && access_token) {

    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
  }

  console.log(config.url, config.params)

  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log("Запрос прошел успешно")
    //console.log("Тело ответа", response.data)
    return response;
  },
  async (error) => {
    let originalRequest = error.config;

    if (error.status === 401) {
      let refresh_token = localStorage.getItem("refresh_token")

      if (refresh_token) {
        let response = (await API.post(`${config.AuthApiUri}api/v1/Authorization/Refresh`, {
          "refreshToken": refresh_token
        })).data

        setAccessToken(response);

        originalRequest.headers.Authorization = `Bearer ${response.token}`
        originalRequest._retry = true;

        API(originalRequest)
      }
    }
  }
)

// Устанавливаем новый access_token
const setAccessToken = ({ token, refreshToken }) => {
  localStorage.setItem('access_token', token);
  localStorage.setItem('refresh_token', refreshToken);
};

const clearAccessToken = () => {
  access_token = null;

  console.log("Токен очищен")
}

export { API, setAccessToken, clearAccessToken };