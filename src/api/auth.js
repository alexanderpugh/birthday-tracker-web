import axios from 'axios';

import { API_ROOT } from './config';

const AUTH_ROOT = 'auth/';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_ROOT}${AUTH_ROOT}login`, { email, password });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};

export const signup = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_ROOT}${AUTH_ROOT}register`, { email, password });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};
