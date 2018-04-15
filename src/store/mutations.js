export default {
  changeUserLoginStatus(state, payload) {
    state.user.isAuthed = payload.isAuthed;
    state.user.token = payload.token || null;
  },

  setContactsData(state, payload) {
    state.contacts.data = payload.contacts;
  },

  setContactsIsLoading(state, payload) {
    state.contacts.isLoading = payload.isLoading;
  },

  setContactsHasError(state, payload) {
    state.contacts.hasError = payload.hasError;
  },

  setEditedContactData(state, payload) {
    state.editedContact.data = payload.contact;
  }
};
