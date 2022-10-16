<template>
  <v-container fluid class="pa-0 ma-0">
    <div class="py-2">
      <span class="text-md-h5 text-h6 font-weight-bold">Inventory</span>
    </div>
    <v-divider></v-divider>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'main',
})
export default class Inventory extends Vue {}
</script>
