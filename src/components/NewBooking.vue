<template>
  <b-container class="col-md-8">
    <b-card>
      <h3 class="h3">new booking for {{ vendorById(singleBooking.vendorId).bus_name }}</h3>
      <p></p>
      <p></p>
      <p></p>
      <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
        <b-form-group horizontal id="selectEvent" label="select event" label-for="selectEvent">
          <b-form-select id="selectEvent" :options="eventNames" v-model="form.eventName"></b-form-select>
        </b-form-group>
        <b-form-group>
          <p></p>
          <b-row>
            <b-col sm="6">
              <label>item 1 name</label>
              <b-form-input
                label="item 1 name"
                id="enterItems"
                type="text"
                v-model="form.items[1].name"
                placeholder="enter item #1 name"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 1 price</label>
              <b-form-input
                id="enterItem1Price"
                type="text"
                v-model.number="form.items[1].price"
                placeholder="enter item #1 price"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 1 quantity</label>
              <b-form-input
                id="enterItem1Quantity"
                type="text"
                v-model.number="form.items[1].quantity"
                placeholder="enter item #1 quantity"
              ></b-form-input>
            </b-col>
          </b-row>
          <p></p>
          <b-row>
            <b-col sm="6">
              <label>item 2 name</label>
              <b-form-input
                id="enterItems"
                type="text"
                v-model="form.items[2].name"
                placeholder="enter item #2 name"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 2 price</label>
              <b-form-input
                id="enterItems"
                type="text"
                v-model.number="form.items[2].price"
                placeholder="enter item #2 price"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 2 quantity</label>
              <b-form-input
                class="col-xs-4"
                id="enterItem1Quantity"
                type="text"
                v-model.number="form.items[2].quantity"
                placeholder="enter item #2 quantity"
              ></b-form-input>
            </b-col>
          </b-row>
          <p></p>
          <b-row>
            <b-col sm="6">
              <label>item 3 name</label>
              <b-form-input
                id="enterItems"
                type="text"
                v-model="form.items[3].name"
                placeholder="enter item #3 name"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 3 price</label>
              <b-form-input
                id="enterItems"
                type="text"
                v-model.number="form.items[3].price"
                placeholder="enter item #3 price"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <label>item 3 quantity</label>
              <b-form-input
                id="enterItems"
                type="text"
                v-model.number="form.items[3].quantity"
                placeholder="enter item #3 quantity"
              ></b-form-input>
            </b-col>
          </b-row>
          <p></p>
          <b-row>
            <b-container
              class="h5 text-right"
            >subtotal: ${{subTotal([form.items[1], form.items[2], form.items[3]])}}</b-container>
          </b-row>
        </b-form-group>
        <b-form-group horizontal id="notes" label="notes" label-for="notes">
          <b-form-textarea id="notes" v-model="form.notes" :row="3" placeholder="Enter notes"></b-form-textarea>
        </b-form-group>
        <b-button-toolbar>
          <b-button class="btn-info btn-round" type="submit">Enter Booking</b-button>
          <b-button
            class="btn-info btn-round"
            @click="updateBookingAndMakeBill"
          >Enter Booking and Create Bill</b-button>
        </b-button-toolbar>
      </b-form>
    </b-card>
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
    itemTotal(item) {
      return item.price * item.quantity;
    },
    subTotal(items) {
      return items.reduce((agg, curr) => {
        return agg + curr.price * curr.quantity;
      }, 0);
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
