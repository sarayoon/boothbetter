<template>
  <card class="card-user">
    <div slot="image">
      <img src="https://brookepaterson.files.wordpress.com/2015/07/fullsizerender21.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="@/assets/img/eatchicinstagramlogo.jpg" alt="...">
        <h4 class="title">
          {{singleVendor.bus_name}}
          <br>
          <a href="#">
            <small>{{singleVendor.bus_social}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">Vegan Chocolate Made in Brooklyn</p>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div v-for="(info, index) in details" :key="index" :class="getClasses(index)">
          <h5>
            {{info.title}}
            <br>
            <small>{{info.subTitle}}</small>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import card from './Card.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    card,
  },
  data() {
    return {
      details: [
        {
          title: '12',
          subTitle: 'events',
        },
        {
          title: 'Dessert',
          subTitle: 'category',
        },
        {
          title: '$0',
          subTitle: 'owed',
        },
      ],
    };
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
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return 'col-lg-3 offset-lg-1';
      } else if (remainder === 2) {
        return 'col-lg-4';
      } else {
        return 'col-lg-3';
      }
    },
  },
};
</script>
<style>
</style>
