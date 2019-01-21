import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import AllEvents from '@/components/AllEvents';
import AllVendors from '@/components/AllVendors';
import SingleVendor from '@/components/SingleVendor';
import NewBooking from '@/components/NewBooking';
import NewBill from '@/components/NewBill';
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
      component: SingleVendor,
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
      props: true,
    },
    {
      path: '/bills/view/:id',
      name: 'PublicBill',
      component: NewBill,
    },
    {
      path: '/bills/:id',
      name: 'NewBill',
      component: NewBill,
      meta: {
        requiresAuth: true,
      },
      props: true,
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
