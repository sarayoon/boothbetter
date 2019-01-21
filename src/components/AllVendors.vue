<template>
  <b-container fluid>
    <h1 class="h1">All Vendors</h1>
    <b-table striped hover :items="vendors" :fields="fields" @row-clicked="selected"></b-table>
    <!-- <ul v-for="(vendor, index) in vendors" v-bind:key="index">
      <router-link :to="{ name: 'SingleVendor', params: {id: vendor.id}}">{{vendor.contact_name}}</router-link>
    </ul>-->
    <!-- <router-view/> -->
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      fields: {
        contact_name: {
          label: 'Contact Name',
          sortable: true,
        },
        contact_phone_num: {
          label: 'Contact Phone Number',
        },
        bus_name: {
          label: 'Business Name',
          sortable: true,
        },
        bus_description: {
          label: 'Business Description',
        },
        bus_social: {
          label: 'Instagram',
        },
      },
    };
  },
  name: 'AllVendors',
  computed: mapState({
    vendors: state => state.vendors.all,
  }),
  methods: {
    selected(row) {
      this.$router.push({ name: 'SingleVendor', params: { id: row.id } });
    },
  },
  created() {
    this.$store.dispatch('getVendors');
  },
};
</script>
