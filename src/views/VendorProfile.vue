<template>
  <b-container>
    <b-row class="align-items-end">
      <b-col class="xl-4 lg-5 md-6">
        <user-card></user-card>
      </b-col>
      <b-col class="xl-8 lg-7 md-6">
        <single-vendor></single-vendor>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SingleVendor from '../components/SingleVendor.vue';
import UserCard from '../components/UserCard.vue';
export default {
  components: {
    SingleVendor,
    UserCard,
  },
};
</script>
<style>
</style>
