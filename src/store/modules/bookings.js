import axios from 'axios';
import { isContext } from 'vm';
import router from '../../router';

const state = {
  all: [],
  selected: {},
};

const mutations = {
  SET_BOOKINGS(state, bookings) {
    state.all = bookings;
  },
  ADD_BOOKING(state, bill) {
    state.all.push(bill);
  },
  UPDATE_BOOKING(state, booking) {
    state.all = [
      ...state.all.filter(elem => {
        elem.id !== booking.id;
      }),
      booking,
    ];
  },
  SET_SINGLE_BOOKING(state, booking) {
    state.selected = booking;
  },
};

const actions = {
  async getBookings({ commit }) {
    const { data } = await axios.get('/api/bookings');
    commit('SET_BOOKINGS', data);
  },
  async makeBooking({ commit }, vendorId) {
    const { data } = await axios.post('/api/bookings', { vendorId });
    commit('ADD_BOOKING', data);
    router.push({ name: 'NewBooking', params: { id: data.id } });
  },
  async updateBooking({ commit }, bookingDetails) {
    const { data } = await axios.put('/api/bookings', bookingDetails);
    commit('UPDATE_BOOKING', data);
  },
  async getSingleBooking({ commit }, bookingId) {
    const { data } = await axios.get(`/api/bookings/${bookingId}`);
    commit('SET_SINGLE_BOOKING', data);
  },
};

export default {
  state,
  mutations,
  actions,
};
