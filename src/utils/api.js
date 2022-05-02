import axios from 'axios'
// import { BACKEND_URL } from './constants'

export const apiClient = (idToken) => {
  const instance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  });
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      return Promise.reject(err)
    }
  );

  return instance;
};

const api = axios.create({
  // baseURL: `${BACKEND_URL}/api`,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err)
  },
)

export default api
