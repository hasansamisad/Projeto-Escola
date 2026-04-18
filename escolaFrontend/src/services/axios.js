import axios from 'axios';

const api = axios.create({
  // Use a variável de ambiente definida no docker-compose
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
