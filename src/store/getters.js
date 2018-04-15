export default {
  contacts(state) {
    return state.contacts.data;
  },
  totalBudget(state) {
    return state.contacts.data.reduce((total, contact) => total + contact.budget, 0);
  },
  userLoggedIn(state) {
    return state.user.isAuthed;
  },
  token(state) {
    return state.user.token;
  }
};
