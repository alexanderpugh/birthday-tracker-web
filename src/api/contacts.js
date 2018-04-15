import axios from 'axios';

import { API_ROOT } from './config';

const AUTH_ROOT = 'contact/';

const root = `${API_ROOT}${AUTH_ROOT}`;

export const load = async ({ token }) => {
  try {
    const response = await axios.get(`${root}?token=${token}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};

export const loadSingle = async ({ token, id }) => {
  try {
    const response = await axios.get(`${root}${id}?token=${token}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};

export const edit = async ({ token, id, data }) => {
  try {
    const response = await axios.put(`${root}${id}`, { ...data, token });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};

export const remove = async ({ token, id }) => {
  try {
    const response = await axios.delete(`${root}${id}?token=${token}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};

export const create = async ({ token, data }) => {
  try {
    const response = await axios.post(root, { token, ...data });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data
  } catch (err) {
    throw err;
  }
};
