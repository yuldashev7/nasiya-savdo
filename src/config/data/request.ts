import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlMzcxOTFmLWM1MzgtNDY5NC1hZDAzLTk0MDRhNjJkMDJiZSIsImlzQWN0aXZlIjp0cnVlLCJyb2xlIjoiU1VQRVIgQURNSU4iLCJpYXQiOjE3NTg2MTYzMDAsImV4cCI6MTc1ODY3MDMwMH0.nRLvi2KmZh-MziofB_5unPUwohGCbaSJSKPwl8-3Xs8`,
  },
});

request.interceptors.request.use(
  (config) => {
    localStorage.getItem('token');
    try {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Token parse error:', err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
