<template>
  <b-container>
    <h3 class="h3">bill confirmation</h3>
    <p>bill # {{bill.id}} sent to {{vendor.contact_name}} at {{vendor.contact_email}}</p>
    <b-button class="btn-info btn-round" @click="$router.push('vendors')">Go to Vendors</b-button>
    <b-button class="btn-info btn-round" @click="$router.push('events')">Go to Events</b-button>
  </b-container>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'BillSent',
  props: ['id'],
  computed: {
    ...mapState({
      bill: state => state.bills.selected.bill,
      event: state => state.bills.selected.event,
      vendor: state => state.bills.selected.vendor,
      items: state => state.bills.selected.items,
    }),
  },
  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('getSingleBill', this.id);
  },
};
</script>
