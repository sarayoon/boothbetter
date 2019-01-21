<template>
  <b-container fluid mt-4>
    <h1 class="h1">All Events</h1>
    <b-table striped hover :items="events" :fields="fields">
      <router-link
        v-for="field in fields"
        :to="{name: 'SingleEvent', params: {id: field.id}}"
        :key="field.id"
      ></router-link>
    </b-table>
    <!-- <ul v-for="(event, index) in events" v-bind:key="index">{{event.name}}</ul> -->
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AllEvents',
  data() {
    return {
      fields: {
        name: {
          label: 'Name',
        },
        start_date: {
          label: 'Start Date',
          sortable: true,
        },
        end_date: {
          label: 'End Date',
          sortable: true,
        },
        description: {
          label: 'Description',
        },
      },
    };
  },
  computed: mapState({
    events: state => state.events.all,
  }),
  created() {
    this.$store.dispatch('getEvents');
  },
};
</script>
