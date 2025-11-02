import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getAuthToken = () => {
  return import.meta.env.VITE_AUTH_TOKEN;
};

const getUserEmail = () => {
  return localStorage.getItem('userEmail') || "teste@email.com"; // vai usar o de teste para a primeira requisição de autentiação, para operações crud tem que ser o do usuário
};

const getIdFuncionario = () => {
  return localStorage.getItem('funcionarioId');
};

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const email = getUserEmail();
    const idFuncionario = getIdFuncionario();

    if (token && email) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-User-Email'] = email;
    }

    if (idFuncionario) {
      config.headers['idFuncionario'] = idFuncionario;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
