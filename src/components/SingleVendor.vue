<template>
  <b-container>
    <b-card :title="singleVendor.contact_name" :sub-title="singleVendor.bus_name">
      <p class="card-text">
        <b>id:</b>
        {{ singleVendor.id }}
      </p>
      <p>
        <b>Contact Name:</b>
        {{ singleVendor.contact_name }}
      </p>
      <p>
        <b>Contact Phone #:</b>
        {{ singleVendor.contact_phone_num }}
      </p>
      <p>
        <b>Business Name #:</b>
        {{ singleVendor.bus_name}}
      </p>
      <p>
        <b>Business Description:</b>
        {{ singleVendor.bus_description}}
      </p>
      <p>
        <b>Business Website:</b>
        {{ singleVendor.bus_website}}
      </p>
      <p>
        <b>Business Social:</b>
        {{ singleVendor.bus_social}}
      </p>
      <b-button @click="makeBooking(id)" variant="primary">Make A Booking</b-button>
    </b-card>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'SingleVendor',
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
