import axios from 'axios';
import { isContext } from 'vm';
import router from '../../router';

const state = {
  all: [],
  selected: {},
};

const mutations = {
  SET_BILLS(state, bills) {
    state.all = bills;
  },
  ADD_BILL(state, bill) {
    state.all.push(bill);
  },
  UPDATE_BILL(state, bill) {
    state.all = [
      ...state.all.filter(elem => {
        elem.id !== bill.id;
      }),
      bill,
    ];
  },
  SET_SINGLE_BILL(state, bill) {
    state.selected = bill;
  },
};

const actions = {
  async getBills({ commit }) {
    const { data } = await axios.get('/api/bills');
    commit('SET_BILLS', data);
  },
  async makeBill({ commit }, bookingId) {
    const { data } = await axios.post('/api/bills', { bookingId });
    commit('ADD_BILL', data);
    router.push({ name: 'NewBill', params: { id: data.id } });
  },
  async updateBill({ commit }, billingDetails) {
    const { data } = await axios.put('/api/bills', { billingDetails });
    commit('UPDATE_BILL', data);
  },
  async getSingleBill({ commit }, billId) {
    const { data } = await axios.get(`/api/bills/${billId}`);
    commit('SET_SINGLE_BILL', data);
  },
  async getPublicBill({ commit }, billId) {
    const { data } = await axios.get(`/api/viewbill/${billId}`);
    commit('SET_SINGLE_BILL', data);
  },
};

export default {
  state,
  mutations,
  actions,
};
