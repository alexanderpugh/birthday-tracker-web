import Cookies from 'js-cookie';

import * as api from '../api/contacts';

export default {
  saveNewContact: async (context, { token, data }) => {
    try {
      const contact = await api.create({ token, data });

    } catch (err) {
      throw err;
    }
  },

  fetchSingleContact: async (context, { token, id }) => {
    try {
      const contact = await api.loadSingle({ token, id });

      return contact;
    } catch (err) {
      throw err;
    }
  },

  deleteContact: async (context, { token, id }) => {
    try {
      const contact = await api.remove({ token, id });

      return contact;
    } catch (err) {
      throw err;
    }
  },

  editContact: async (context, { token, id, data }) => {
    try {
      const contact = await api.edit({ token, id, data });

      return contact;
    } catch (err) {
      throw err;
    }
  },

  loginUser: (context, token) => {
    Cookies.set('BIRTHDAY_TRACKER_TOKEN', token);

    context.commit('changeUserLoginStatus', {
      isAuthed: true,
      token
    });
  },

  logoutUser: (context) => {
    Cookies.remove('BIRTHDAY_TRACKER_TOKEN');

    context.commit('changeUserLoginStatus', {
      isAuthed: false,
      token: null
    });
  },

  loadContacts: async (context, token) => {
    try {
      const contacts = await api.load({ token });

      context.commit('setContactsData', { contacts });
    } catch (err) {
      throw err;
    }
  }
};
