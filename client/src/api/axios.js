import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); 
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = jwtDecode(token);
      const isExpired = Date.now() >= exp * 1000;

      const isAuthApiCall = !config.url.includes('/auth/');

      if (isExpired && isAuthApiCall) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject({ message: 'Token expired' });
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
