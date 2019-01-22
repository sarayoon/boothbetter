<template>
  <card class="card" title="vendor details" :sub-title="singleVendor.bus_name">
    <b-container>
      <b-row>
        <p class="col-md-6">
          <b>contact name:</b>
          {{ singleVendor.contact_name }}
        </p>
        <p class="col-md-6 text-right">
          <b>id:</b>
          {{ singleVendor.id }}
        </p>
      </b-row>
      <p>
        <b>phone num:</b>
        {{ singleVendor.contact_phone_num }}
      </p>
      <p>
        <b>business name:</b>
        {{ singleVendor.bus_name}}
      </p>
      <p>
        <b>description:</b>
        {{ singleVendor.bus_description}}
      </p>
      <p>
        <b>business website:</b>
        {{ singleVendor.bus_website}}
      </p>
      <p>
        <b>business social:</b>
        {{ singleVendor.bus_social}}
      </p>
      <b-container class="text-center">
        <b-button class="btn-info btn-round" @click="makeBooking(id)">Make A Booking</b-button>
      </b-container>
    </b-container>
  </card>
</template>

<script>
import card from './Card.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'SingleVendor',
  components: {
    card,
  },
  computed: mapState({
    singleVendor: state => state.vendors.selected,
  }),
  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('getSingleVendor', this.id);
  },
  methods: {
    ...mapActions(['makeBooking']),
  },
};
</script>
