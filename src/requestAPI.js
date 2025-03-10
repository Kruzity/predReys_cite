import axios from 'axios';

// Конфигурация API клиента
const API = axios.create();

let access_token = null;
let refresh_token = null;
let refresh_timeout = null;

API.interceptors.request.use((config) => {
  if (!config._retry && access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  console.log(config.url, config.params, access_token)

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
      if (refresh_token) {
        let response = (await API.post("https://stageauth.predreysdoc.com/api/v1/Authorization/Refresh", {
          "refreshToken": refresh_token
        })).data

        setAccessToken(response);

        originalRequest.headers.Authorization = `Bearer ${response.token}`
        originalRequest._retry = true;

        API(originalRequest)
      }
      else {
        const response = (await API.post('https://stageauth.predreysdoc.com/api/v1/Authorization/Signin', { userId: "info@feniks.ru", password: "12345678" })).data;
        setAccessToken(response);

        originalRequest.headers.Authorization = `Bearer ${response.token}`
        originalRequest._retry = true;

        API(originalRequest)
      }
    }
  }
)

// Устанавливаем новый access_token
const setAccessToken = ({ token, expiresIn, refreshToken }) => {

  access_token = token;
  refresh_token = refreshToken;
  //scheduleTokenRefresh(expiresIn);
};

const clearAccessToken = () => {
  access_token = null;

  console.log("Токен очищен")
}

export { API, setAccessToken, clearAccessToken };