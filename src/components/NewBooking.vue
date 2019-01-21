<template>
  <b-container>
    <h1>New Booking for {{ vendorById(singleBooking.vendorId).contact_name }}</h1>
    <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group horizontal id="selectEvent" label="Select Event" label-for="selectEvent">
        <b-form-select id="selectEvent" :options="eventNames" v-model="form.eventName"></b-form-select>
      </b-form-group>
      <b-form-group>
        <label>Item #1</label>
        <b-row>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model="form.items[1].name"
              placeholder="Enter item #1"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="enterItem1Price"
              type="text"
              v-model.number="form.items[1].price"
              placeholder="Enter item #1 price"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="enterItem1Quantity"
              type="text"
              v-model.number="form.items[1].quantity"
              placeholder="Enter item #1 quantity"
            ></b-form-input>
          </b-col>
        </b-row>
        <label>Item #2</label>
        <b-row>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model="form.items[2].name"
              placeholder="Enter item #2 name"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model.number="form.items[2].price"
              placeholder="Enter item #2 price"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              class="col-xs-4"
              id="enterItem1Quantity"
              type="text"
              v-model.number="form.items[2].quantity"
              placeholder="Enter item #2 quantity"
            ></b-form-input>
          </b-col>
        </b-row>
        <label>Item #3</label>
        <b-row>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model="form.items[3].name"
              placeholder="Enter item #3 name"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model.number="form.items[3].price"
              placeholder="Enter item #3 price"
            ></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="enterItems"
              type="text"
              v-model.number="form.items[3].quantity"
              placeholder="Enter item #3 quantity"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group horizontal id="notes" label="Notes" label-for="notes">
        <b-form-textarea id="notes" v-model="form.notes" :row="3" placeholder="Enter notes"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Enter Booking</b-button>
      <b-button @click="updateBookingAndMakeBill" variant="primary">Enter Booking and Create Bill</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'NewBooking',
  data() {
    return {
      show: true,
      form: {
        eventName: '',
        items: {
          1: { name: '', price: '', quantity: '' },
          2: { name: '', price: '', quantity: '' },
          3: { name: '', price: '', quantity: '' },
        },
        notes: '',
      },
    };
  },
  computed: {
    ...mapGetters(['vendorById', 'eventNames']),
    booking() {
      const details = {};
      details.id = this.id;
      details.vendorId = this.vendorId;
      details.eventName = this.form.eventName;
      details.items = [
        this.form.items[1],
        this.form.items[2],
        this.form.items[3],
      ];
      details.notes = this.form.notes;
      return details;
    },
    ...mapState({
      singleBooking: state => state.bookings.selected,
    }),
  },
  methods: {
    ...mapActions(['updateBooking', 'makeBill', 'addItems']),
    async onSubmit() {
      await this.updateBooking(this.bookingDetails);
      this.onReset();
    },
    onReset() {
      this.show = false;
      this.form.eventName = '';
      this.form.items[1].name = '';
      this.form.items[1].price = '';
      this.form.items[1].quantity = '';
      this.form.items[2].name = '';
      this.form.items[2].price = '';
      this.form.items[2].quantity = '';
      this.form.items[3].name = '';
      this.form.items[3].price = '';
      this.form.items[3].quantity = '';
    },
    async updateBookingAndMakeBill(evt) {
      evt.preventDefault();
      await this.updateBooking(this.booking);
      await this.addItems({
        items: this.booking.items,
        bookingId: this.booking.id,
      });
      await this.makeBill(this.booking.id);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('getEvents');
    this.$store.dispatch('getSingleBooking', this.id);
  },
};
</script>
