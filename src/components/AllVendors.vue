<template>
  <b-container fluid>
    <h4 class="h4">all vendors</h4>
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
          label: 'contact name',
          sortable: true,
        },
        contact_phone_num: {
          label: 'contact number',
        },
        bus_name: {
          label: 'business name',
          sortable: true,
        },
        bus_description: {
          label: 'business description',
        },
        bus_social: {
          label: 'instagram',
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
