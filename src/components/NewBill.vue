<template>
  <b-container>
    <h1>New Bill</h1>
    <h5>Bill #: {{bill.id}}</h5>
    <b-row>
      <b-col class="xs-6">
        <strong>Billed To:</strong>
        <br>
        <strong>Contact Name:</strong>
        {{ vendor.contact_name}}
        <br>
        <strong>Business Name:</strong>
        {{vendor.bus_name}}
        <br>
        <strong>Contact Phone Number:</strong>
        {{vendor.contact_phone_num}}
        <br>
        <strong>Contact Email:</strong>
        {{vendor.contact_email}}
        <br>
        <strong>Event:</strong>
        {{event.name}}
        <br>
        <strong>Start Date:</strong>
        {{event.start_date}}
        <br>
        <strong>End Date:</strong>
        {{event.end_date}}
        <br>
      </b-col>
      <b-col class="xs-6" text-right>
        <strong>Billed From:</strong>
        Clearview Productions
        <br>sara@clearviewproductions.com
      </b-col>
    </b-row>
    <b-row>
      <b-col class="md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <strong>Order summary</strong>
            </h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <td>
                      <strong>Item</strong>
                    </td>
                    <td class="text-center">
                      <strong>Price</strong>
                    </td>
                    <td class="text-center">
                      <strong>Quantity</strong>
                    </td>
                    <td class="text-right">
                      <strong>Totals</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{item.name}}</td>
                    <td class="text-center">{{item.price}}</td>
                    <td class="text-center">{{item.quantity}}</td>
                    <td class="text-right">{{itemTotal(item)}}</td>
                  </tr>
                  <tr>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line text-center">
                      <strong>Subtotal</strong>
                    </td>
                    <td class="thick-line text-right">${{subTotal(items)}}</td>
                  </tr>
                  <tr>
                    <td class="no-line"></td>
                    <td class="no-line"></td>
                    <td class="no-line text-center">
                      <strong>Tax</strong>
                    </td>
                    <td class="no-line text-right">$0</td>
                  </tr>
                  <tr>
                    <td class="no-line"></td>
                    <td class="no-line"></td>
                    <td class="no-line text-center">
                      <strong>Total</strong>
                    </td>
                    <td class="no-line text-right">${{subTotal(items)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-button @click="sendEmail" variant="primary">Send Email</b-button>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';
export default {
  name: 'NewBill',
  computed: {
    ...mapState({
      bill: state => state.bills.selected.bill,
      event: state => state.bills.selected.event,
      vendor: state => state.bills.selected.vendor,
      items: state => state.bills.selected.items,
    }),
  },
  methods: {
    ...mapActions(['updateBill']),
    itemTotal(item) {
      return item.price * item.quantity;
    },
    subTotal(items) {
      return items.reduce((agg, curr) => {
        return agg + curr.price * curr.quantity;
      }, 0);
    },
    async sendEmail() {
      const arr = [this.bill.id, this.vendor.id, this.event.id];
      const { data } = await axios.post('/api/sendemail', {
        arr,
      });
      console.log('data from sendemail route is ', data);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch('getSingleBill', this.id);
  },
};
</script>
<style>
.invoice-title h2,
.invoice-title h3 {
  display: inline-block;
}

.table > tbody > tr > .no-line {
  border-top: none;
}

.table > thead > tr > .no-line {
  border-bottom: none;
}

.table > tbody > tr > .thick-line {
  border-top: 2px solid;
}
</style>
