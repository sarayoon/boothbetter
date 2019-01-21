import axios from 'axios';

const state = {
  all: [],
};

const mutations = {
  SET_EVENTS(state, events) {
    state.all = events;
  },
};

const actions = {
  async getEvents(context) {
    const { data } = await axios.get('/api/events');
    context.commit('SET_EVENTS', data);
  },
};

const getters = {
  eventNames: state => {
    return state.all.map(event => event.name);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
