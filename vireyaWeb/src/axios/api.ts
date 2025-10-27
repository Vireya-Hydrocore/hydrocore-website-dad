import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getAuthToken = () => {
  return "teste233"
  // localStorage.getItem('authToken') || null;
};

const getUserEmail = () => {
  return "teste@email.com"
  // localStorage.getItem('userEmail') || null;
};

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const email = getUserEmail();

    if (token && email) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-User-Email'] = email;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas e erros globais
api.interceptors.response.use(
  (response) => {
    // Aqui você pode processar a resposta antes de retorná-la, se necessário
    return response;
  },
  (error) => {
    // Caso ocorra um erro na resposta (exemplo: 401 - Não autorizado), podemos tratá-lo aqui
    if (error.response && error.response.status === 401) {
      // Redirecionar para a página de login ou mostrar uma mensagem de erro
      console.error('Não autorizado. Redirecionando para o login...');
      // Aqui pode ir a lógica de logout ou redirecionamento
    }

    // Podemos também logar outros tipos de erros aqui
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;
