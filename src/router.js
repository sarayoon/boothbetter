import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import AllEvents from '@/components/AllEvents';
import AllVendors from '@/components/AllVendors';
import VendorProfile from '@/views/VendorProfile';
import NewBooking from '@/components/NewBooking';
import NewBill from '@/components/NewBill';
import BillSent from '@/components/BillSent';
import PublicBill from '@/components/PublicBill';
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
  issuer: 'https://dev-806185.oktapreview.com/oauth2/default',
  client_id: '0oaj19griooSF4cD20h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email',
});

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
    {
      path: '/events',
      name: 'AllEvents',
      component: AllEvents,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/vendors/:id',
      name: 'SingleVendor',
      component: VendorProfile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/vendors',
      name: 'AllVendors',
      component: AllVendors,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bookings/:id',
      name: 'NewBooking',
      component: NewBooking,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/viewbill/:id',
      name: 'PublicBill',
      component: PublicBill,
    },
    {
      path: '/bills/:id',
      name: 'NewBill',
      component: NewBill,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/billconfirmation',
      name: 'BillSent',
      component: BillSent,
      meta: {
        requiresAuth: true,
      },
      props: true,
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
