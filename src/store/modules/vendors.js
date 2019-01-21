import axios from 'axios';

const state = {
  all: [],
  selected: {},
};

const mutations = {
  SET_ALL_VENDORS(state, vendors) {
    state.all = vendors;
  },
  SET_SINGLE_VENDOR(state, vendor) {
    state.selected = vendor;
  },
};

const actions = {
  async getVendors({ commit }) {
    const { data } = await axios.get('/api/vendors');
    commit('SET_ALL_VENDORS', data);
  },
  async getSingleVendor({ commit }, vendorId) {
    const { data } = await axios.get(`/api/vendors/${vendorId}`);
    commit('SET_SINGLE_VENDOR', data);
  },
};

const getters = {
  vendorById: state => id => {
    return state.all.find(vendor => vendor.id === id);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
