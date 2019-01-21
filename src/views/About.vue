<template>
  <div class="about">
    <h1>About Page</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'About',
  computed: { ...mapState(['vendors']) },
  methods: {
    // ...mapActions(['getVendors']),
  },
  created() {
    // this.$store.dispatch('getVendors');
  },
};
</script>
