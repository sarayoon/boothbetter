import axios from 'axios';

const state = {
  all: [],
};

const mutations = {
  SET_ITEMS(state, items) {
    state.all = items;
  },
  ADD_ITEMS(state, items) {
    return items.forEach(item => state.all.push(item));
  },
};

const actions = {
  async getItems({ commit }) {
    const { data } = await axios.get('/api/items');
    commit('SET_ITEMS', data);
  },
  async addItems({ commit }, { items, bookingId }) {
    const { data } = await axios.post('/api/items', { items, bookingId });
    commit('ADD_ITEMS', data);
  },
};

const getters = {};
// calculateBillTotal(items) {
//   return items.reduce((acc, curr) => {
//     return acc + curr.price * curr.quantity;
//   }, 0);
// },

export default {
  state,
  mutations,
  actions,
  getters,
};
