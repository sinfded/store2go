<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet width="100%" height="100%" class="d-flex" color="transparent">
      <v-sheet
        height="100%"
        class="d-flex flex-grow-1 flex-column justify-start"
        color="transparent"
      >
        <div class="d-flex mb-4 align-center">
          <v-text-field
            solo
            placeholder="Type product name or scan barcode"
            prepend-inner-icon="mdi-magnify"
            color="primary"
            class="rounded-lg text-subtitle-2 font-weight-regular"
            :background-color="searchBG"
            autofocus
            hide-details
            @focus="changeBG('secondary')"
            @blur="changeBG('accent')"
          ></v-text-field>
          <v-btn
            fab
            tile
            height="48"
            width="48"
            class="ml-4 rounded-lg"
            elevation="2"
            color="primary"
          >
            <v-icon>mdi-barcode-scan</v-icon>
          </v-btn>
        </div>
        <v-sheet
          class="flex-grow-1 d-flex flex-column overflow-hidden"
          width="100%"
          height="100%"
          color="accent"
          elevation="2"
          rounded="lg"
        >
          <v-sheet
            class="px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg"
            color="primary"
            dark
          >
            <v-row no-gutters align="center">
              <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">SKU</v-col>
              <v-col cols="4" lg="5">Description</v-col>
              <v-col cols="2" class="text-center">Price</v-col>
              <v-col cols="3" lg="2" class="text-center">Qty.</v-col>
              <v-col cols="3" lg="2" class="text-right">Subtotal</v-col>
            </v-row>
          </v-sheet>
          <v-sheet
            class="flex-grow-1 overflow-y-auto px-2 pt-2"
            color="transparent"
            width="100%"
          >
            <v-sheet
              v-for="(item, index) in cartItems"
              :key="index"
              height="56"
              elevation="1"
              rounded="lg"
              class="mb-2 px-3 d-flex align-content-center text-sm-subtitle-2 text-caption font-weight-medium"
            >
              <v-row no-gutters align="center">
                <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">{{
                  item.sku
                }}</v-col>
                <v-col cols="4" lg="5" class="d-flex flex-column justify-start">
                  <span>
                    {{ item.name }}
                  </span>
                  <span
                    v-if="$vuetify.breakpoint.mdAndDown"
                    class="grey--text mt-n1"
                    style="font-size: x-small"
                    >{{ item.sku }}</span
                  >
                </v-col>
                <v-col cols="2" class="text-center">{{
                  currencyFormat(item.price)
                }}</v-col>
                <v-col cols="3" lg="2">
                  <v-sheet
                    width="80"
                    max-width="100%"
                    class="d-flex justify-space-between align-center mx-auto"
                  >
                    <v-btn
                      tile
                      fab
                      :dark="item.quantity == 1"
                      elevation="1"
                      height="24"
                      width="24"
                      class="rounded"
                      :class="[item.quantity == 1 ? 'red lighten-1' : '']"
                      @click="decreaseQty(item)"
                    >
                      <v-icon v-if="item.quantity > 1" small>mdi-minus</v-icon>
                      <v-icon v-else small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                    <span>{{ item.quantity }}</span>
                    <v-btn
                      tile
                      fab
                      elevation="1"
                      height="24"
                      width="24"
                      class="rounded"
                      @click="increaseQty(item)"
                    >
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </v-sheet>
                </v-col>
                <v-col cols="3" lg="2" class="text-right">{{
                  currencyFormat(item.subtotal)
                }}</v-col>
              </v-row>
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet
          v-if="$vuetify.breakpoint.mdAndDown"
          width="100%"
          elevation="2"
          class="mt-4"
          rounded="lg"
          color="accent"
        >
          <v-row no-gutters class="fill-height">
            <v-col cols="12" md="5" class="px-2 pt-2">
              <div class="d-flex align-center">
                <v-combobox
                  v-model="customer"
                  :items="customers"
                  dense
                  outlined
                  class="rounded-lg text-subtitle-2 font-weight-regular"
                  :menu-props="{ bottom: true, offsetY: true }"
                  hide-details
                ></v-combobox>
                <v-btn
                  fab
                  tile
                  height="38"
                  width="38"
                  class="ml-2 rounded-lg"
                  elevation="2"
                >
                  <v-icon color="grey darken-1">mdi-account-plus</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="8" md="5" class="text-subtitle-2 pa-2">
              <v-row no-gutters>
                <span class="grey--text">Subtotal</span>
                <v-spacer></v-spacer>
                <span>{{ currencyFormat(cartSubtotal) }}</span>
              </v-row>
              <v-row no-gutters>
                <span class="grey--text">Discount</span>
                <v-spacer></v-spacer>
                <span>{{ numberFormat(discount) }}</span>
              </v-row>
              <v-row no-gutters>
                <span class="grey--text">Sales Tax</span>
                <v-spacer></v-spacer>
                <span>{{ numberFormat(vat) }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-row no-gutters class="text-h6 font-weight-bold primary--text">
                <span>Total</span>
                <v-spacer></v-spacer>
                <span>{{ currencyFormat(cartTotal) }}</span>
              </v-row>
            </v-col>
            <v-col cols="4" md="2" class="pa-2">
              <v-card
                @click="paymentModal = !paymentModal"
                dark
                ripple
                width="100%"
                height="100%"
                color="primary"
                rounded="lg"
                elevation="3"
                class="d-flex flex-column justify-center align-center"
                style="cursor: pointer"
              >
                <v-sheet
                  width="56"
                  height="56"
                  color="primary lighten-1"
                  class="d-flex justify-center align-center rounded-circle"
                >
                  <v-icon size="40">mdi-credit-card-outline</v-icon>
                </v-sheet>
                <span class="text-subtitle-2">Payment</span>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>
      <v-sheet
        v-if="$vuetify.breakpoint.lgAndUp"
        width="30%"
        min-width="350"
        max-width="500"
        height="100%"
        class="rounded-lg ml-4"
        color="accent"
        elevation="1"
      ></v-sheet>
    </v-sheet>
    <PaymentModal
      v-if="paymentModal"
      :showModal="paymentModal"
      :toPay="cartTotal"
      v-on:closeModal="paymentModal = false"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PaymentModal from 'Component/Modals/PaymentModal.vue'

@Component({
  layout: 'main',
  components: {
    PaymentModal: PaymentModal,
  },
})
export default class Register extends Vue {
  view_format = 0
  searchBG = 'accent'
  $vuetify: any
  discount = 0
  vat = 0
  customer = 'Walk-in Customer'
  paymentModal = false

  items: NotWellDefinedObject[] = [
    {
      sku: '123115134',
      name: 'Item 1',
      price: 10,
      quantity: 1,
    },
    {
      sku: '166315134',
      name: 'Item 2',
      price: 7,
      quantity: 5,
    },
    {
      sku: '121231134',
      name: 'Item 3',
      price: 15,
      quantity: 4,
    },
    {
      sku: '123111233',
      name: 'Item 4',
      price: 10,
      quantity: 6,
    },
  ]

  customers: string[] = ['Walk-in Customer']

  get cartItems() {
    return this.items.map((item: NotWellDefinedObject) => {
      return {
        sku: item.sku,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }
    })
  }

  get cartSubtotal() {
    return this.cartItems.reduce((total: any, curr: NotWellDefinedObject) => {
      return total + curr.subtotal
    }, 0)
  }

  get cartTotal() {
    return this.cartSubtotal - this.discount - this.vat
  }

  increaseQty(item: NotWellDefinedObject) {
    this.items = this.items.map((i: NotWellDefinedObject) => {
      if (i.sku == item.sku) {
        i.quantity = item.quantity + 1
      }
      return i
    })
  }

  decreaseQty(item: NotWellDefinedObject) {
    if (item.quantity > 1) {
      this.items = this.items.map((i: NotWellDefinedObject) => {
        if (i.sku == item.sku) {
          i.quantity = item.quantity - 1
        }
        return i
      })
    } else {
      this.items = this.items.filter(
        (i: NotWellDefinedObject) => i.sku != item.sku
      )
    }
  }

  currencyFormat(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value)
  }

  numberFormat(value: number) {
    return new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 2,
    }).format(value)
  }

  changeBG(color: string) {
    this.searchBG = color
  }

  mounted() {
    this.$db.getInfo().then((data: NotWellDefinedObject) => console.log(data))
  }
}
</script>
