<template>
  <b-container>
    <b-row>
      <b-col class="xs-10">
        <div class="invoice-title">
          <h2 class="h2">bill</h2>
          <h2 class="h2 float-right"># {{bill.id}}</h2>
        </div>
        <hr>
        <b-row>
          <b-col class="xs-6">
            <strong>Billed To:</strong>
            <br>
            {{ vendor.contact_name}}
            <br>
            {{vendor.bus_name}}
            <br>
            {{vendor.contact_phone_num}}
            <br>
            {{vendor.contact_email}}
            <br>
          </b-col>
          <b-col class="xs-6 text-right">
            <strong>Billed From:</strong>
            <br>Street Fair Productions
            <br>sara@streetfairproductions.com
            <br>212-584-7448
          </b-col>
        </b-row>

        <b-row>
          <b-col class="xs-6">
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
          <b-col class="xs-6 text-right">
            <br>
            <strong>Bill Date:</strong>
            <br>January 22, 2019
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col class="md-12">
            <b-card>
              <div class="card-heading">
                <h3 class="h3">Order Summary</h3>
              </div>
              <div class="card-body">
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
                          <strong>Total</strong>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in items" :key="index">
                        <td>{{item.name}}</td>
                        <td class="text-center">${{item.price}}</td>
                        <td class="text-center">{{item.quantity}}</td>
                        <td class="text-right">${{itemTotal(item)}}</td>
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
            </b-card>
          </b-col>
        </b-row>
        <b-container class="text-right">
          <b-button class="btn-info btn-round" @click="sendEmail">Send Via Email</b-button>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';
import router from '../router';
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
      const billingDetails = [this.bill.id, this.subTotal(this.items)];
      await this.updateBill(billingDetails);
      await axios.post('/api/sendemail', { arr });
      router.push({ name: 'BillSent', params: { id: this.bill.id } });
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
