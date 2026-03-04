import axios from 'axios';
import type { LoginForm, RegisterForm, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: LoginForm): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterForm): Promise<{ message: string }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export default api;
