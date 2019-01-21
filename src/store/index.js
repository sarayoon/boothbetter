import Vue from 'vue';
import Vuex from 'vuex';
import events from './modules/events';
import vendors from './modules/vendors';
import bookings from './modules/bookings';
import bills from './modules/bills';
import items from './modules/items';
// import data from './data/vendors.json';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    events,
    // {all: []}
    vendors,
    // {all: []}
    bookings,
    // {add: []}
    items,
    bills,
  },
  strict: debug,
});
