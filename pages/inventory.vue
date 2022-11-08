<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet width="100%" height="100%" class="d-flex" color="transparent">
      <v-sheet
        height="100%"
        class="d-flex flex-grow-1 flex-column justify-start"
        color="transparent"
      >
        <div class="d-flex mb-4 align-center">
          <v-sheet
            height="48"
            elevation="0"
            rounded="lg"
            class="flex-grow-1 d-flex align-center text-subtitle-2 font-weight-regular"
            color="accent"
          >
            <v-sheet
              class="d-flex justify-center align-center rounded-l-lg pl-3"
              color="transparent"
              height="100%"
              elevation="2"
            >
              <v-sheet
                v-if="$vuetify.breakpoint.smAndUp"
                class="mr-3 text-subtitle-2 grey--text text--darken-1"
                color="transparent"
                >Filter</v-sheet
              >
              <v-btn
                fab
                tile
                height="28"
                width="28"
                class="rounded mr-3"
                elevation="0"
                color="primary lighten-3"
              >
                <v-icon size="24">mdi-tune-vertical</v-icon>
              </v-btn>
            </v-sheet>
            <v-divider vertical></v-divider>
            <v-text-field
              solo
              placeholder="Search for products"
              prepend-inner-icon="mdi-magnify"
              color="primary"
              class="rounded-lg text-subtitle-2 font-weight-regular flex-grow-1 rounded-r-lg rounded-l-0"
              :background-color="searchBG"
              autofocus
              hide-details
              @focus="changeBG('transparent')"
              @blur="changeBG('transparent')"
            ></v-text-field>
          </v-sheet>
          <v-btn
            height="48"
            :width="!$vuetify.breakpoint.smAndUp ? '48' : ''"
            class="ml-4 rounded-lg text-capitalize text-subtitle-2"
            elevation="2"
            color="primary"
            :fab="!$vuetify.breakpoint.smAndUp"
            @click="showProductModal('Add Product')"
          >
            <v-icon :class="[$vuetify.breakpoint.smAndUp ? 'mr-2 ml-n2' : '']"
              >mdi-package-variant-closed-plus</v-icon
            >
            <span v-if="$vuetify.breakpoint.smAndUp">Add Product</span>
          </v-btn>
        </div>
        <v-sheet
          class="flex-grow-1 d-flex flex-column overflow-hidden"
          width="100%"
          height="100%"
          color="accent"
          elevation="2"
          rounded="lg"
          style="position: relative"
        >
          <v-sheet
            class="px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg d-flex align-center justify-center"
            color="primary"
            dark
          >
            <v-checkbox
              hide-details
              :value="selectedProducts.length > 0"
              :indeterminate="selectedProducts.length > 0"
              :disabled="selectedProducts.length < 1"
              @change="emptySelected"
              class="ma-0 mt-n1 mr-2"
            ></v-checkbox>
            <v-row no-gutters align="center">
              <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1">SKU</v-col>
              <v-col cols="4">Description</v-col>
              <v-col
                v-if="$vuetify.breakpoint.mdAndUp"
                cols="2"
                class="text-center"
                >Variant</v-col
              >
              <v-col cols="3" sm="2" class="text-center">Supplier</v-col>
              <v-col cols="2" sm="1" class="text-center">Stock</v-col>
              <v-col cols="3" sm="2" class="text-center">Price</v-col>
            </v-row>
          </v-sheet>
          <v-sheet
            class="flex-grow-1 overflow-y-auto px-2 pt-2"
            color="transparent"
            width="100%"
          >
            <v-sheet
              v-for="(product, index) in $inventory.sortedProducts"
              :key="index"
              height="56"
              elevation="1"
              rounded="lg"
              class="mb-2 px-3 d-flex align-center text-sm-subtitle-2 text-caption font-weight-medium"
            >
              <v-checkbox
                hide-details
                :value="checkSelected(product._id)"
                class="ma-0 mt-n1 mr-2"
                @change="selectProduct(product._id)"
              ></v-checkbox>
              <v-row no-gutters align="center">
                <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1">{{
                  product.sku
                }}</v-col>
                <v-col cols="4" class="d-flex flex-column justify-start">
                  <span>
                    {{ product.name }}
                  </span>
                  <span
                    v-if="$vuetify.breakpoint.smAndDown"
                    class="grey--text mt-n1"
                    style="font-size: x-small"
                    >{{ product.sku }}</span
                  >
                </v-col>
                <v-col
                  v-if="$vuetify.breakpoint.mdAndUp"
                  cols="2"
                  class="text-center"
                  >{{ product.variant }}</v-col
                >
                <v-col cols="3" sm="2" class="text-center"
                  >Supplier {{ index + 1 }}</v-col
                >
                <v-col cols="2" sm="1" class="text-center">
                  <span>{{ $format.numberFormat(product.stock, 1) }}</span>
                </v-col>
                <v-col cols="3" sm="2" class="text-center">{{
                  $format.currencyFormat(product.price.retail)
                }}</v-col>
              </v-row>
            </v-sheet>
          </v-sheet>
          <v-speed-dial
            v-show="selectedProducts.length > 0 && !$vuetify.breakpoint.mdAndUp"
            v-model="optionBtn"
            absolute
            right
            bottom
            direction="top"
            transition="slide-y-reverse"
            class="mr-n2 mb-n2"
          >
            <template v-slot:activator>
              <v-badge
                :content="selectedProducts.length"
                :value="selectedProducts.length"
                color="grey"
                overlap
              >
                <v-btn
                  v-model="optionBtn"
                  color="primary"
                  dark
                  fab
                  height="40"
                  width="40"
                >
                  <v-icon v-if="optionBtn" @click="emptySelected">
                    mdi-close
                  </v-icon>
                  <v-icon v-else> mdi-menu-up </v-icon>
                </v-btn>
              </v-badge>
            </template>
            <v-btn
              :disabled="selectedProducts.length > 1"
              fab
              small
              :dark="selectedProducts.length == 1"
              color="blue lighten-1"
            >
              <v-icon size="22">mdi-content-copy</v-icon>
            </v-btn>
            <v-btn
              :disabled="selectedProducts.length > 1"
              fab
              small
              :dark="selectedProducts.length == 1"
              color="green lighten-1"
            >
              <v-icon size="22">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              color="red lighten-1"
              :dark="selectedProducts.length > 0"
            >
              <v-icon size="22">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-sheet>
        <v-sheet
          width="100%"
          class="mt-4 d-flex align-center justify-end"
          color="transparent"
        >
          <v-sheet
            v-if="selectedProducts.length > 0 && $vuetify.breakpoint.mdAndUp"
            class="flex-grow-1 d-flex px-3 align-center justify-space-between"
            color="accent"
            rounded="lg"
            height="56"
            elevation="2"
          >
            <div class="ml-n2 d-flex align-center">
              <v-btn
                plain
                fab
                height="36"
                width="36"
                class="mr-1"
                @click="emptySelected"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-sheet
                height="24"
                dark
                class="py-2 px-4 d-flex justify-center align-center rounded-pill text-subtitle-2 font-weight-bold"
                color="grey"
              >
                {{ selectedProducts.length }}
              </v-sheet>
              <span class="text-subtitle-2 ml-2"
                >{{
                  selectedProducts.length > 1 ? 'items' : 'item'
                }}
                selected</span
              >
            </div>
            <div>
              <v-btn
                class="rounded-lg text-capitalize white--text text-subtitle-2"
                color="blue lighten-1"
                :disabled="selectedProducts.length > 1"
                @click="cloneProduct('Clone Product')"
              >
                <v-icon class="ml-n2 mr-2">mdi-content-copy</v-icon> Clone
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize ml-2 white--text text-subtitle-2"
                color="green lighten-1"
                :disabled="selectedProducts.length > 1"
                @click="updateProduct('Update Product Data')"
              >
                <v-icon class="ml-n2 mr-2">mdi-pencil-outline</v-icon> Edit
              </v-btn>
              <v-btn
                dark
                class="rounded-lg text-capitalize ml-2 text-subtitle-2"
                color="red lighten-1"
              >
                <v-icon class="ml-n2 mr-2">mdi-trash-can-outline</v-icon> Delete
              </v-btn>
            </div>
          </v-sheet>
          <v-sheet
            rounded="lg"
            elevation="2"
            color="accent"
            height="56"
            :width="!$vuetify.breakpoint.smAndUp ? '100%' : 'auto'"
            class="d-flex justify-center align-center px-1"
            :class="[$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ma-0']"
          >
            <v-pagination
              v-model="page"
              :length="10"
              :total-visible="5"
            ></v-pagination>
          </v-sheet>
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
    <ProductModal
      v-if="productModal.modal"
      :productModal="productModal.modal"
      :cardtitle="productModal.title"
      :method="productModal.method"
      :product="productModal.product"
      v-on:closeModal="closeProductModal"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import ProductModal from '~/components/Modals/ProductModal.vue'
import { ProductData } from '~/types/plugins/inventory'

@Component({
  layout: 'main',
  components: {
    ProductModal: ProductModal,
  },
})
export default class Inventory extends Vue {
  searchBG = 'accent'
  btnGroup = undefined
  selectedProducts: string[] = []
  page = 1
  productModal: NotWellDefinedObject = {
    modal: false,
    title: '',
    product: null,
    method: '',
  }
  optionBtn = false

  selectProduct(id: string) {
    const selected = this.selectedProducts.find((item: string) => item == id)
    if (selected)
      this.selectedProducts = this.selectedProducts.filter(
        (item: string) => item != id
      )
    else this.selectedProducts.push(id)
  }

  emptySelected() {
    this.selectedProducts = []
  }

  checkSelected(id: string) {
    const selected = this.selectedProducts.find((item: string) => item == id)
    if (selected) return true
    else return false
  }

  changeBG(color: string) {
    this.searchBG = color
  }

  showProductModal(cardTitle: string) {
    this.productModal = {
      modal: true,
      title: cardTitle,
    }
  }

  closeProductModal() {
    this.productModal = {
      modal: false,
      title: '',
      product: null,
      method: '',
    }
  }

  updateProduct(cardTitle: string) {
    this.productModal = {
      modal: true,
      title: cardTitle,
      product: this.$inventory.sortedProducts.find(
        (product: ProductData) => product._id == this.selectedProducts[0]
      ),
      method: 'update',
    }
  }

  cloneProduct(cardTitle: string) {
    this.productModal = {
      modal: true,
      title: cardTitle,
      product: this.$inventory.sortedProducts.find(
        (product: ProductData) => product._id == this.selectedProducts[0]
      ),
      method: 'clone',
    }
  }

  created() {
    if (this.$inventory.products.length == 0) this.$inventory.getAllProducts()
  }
}
</script>
