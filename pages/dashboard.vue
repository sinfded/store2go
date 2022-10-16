<template>
  <v-container fluid class="pa- ma-0">
    <div class="py-2">
      <span class="text-md-h5 text-h6 font-weight-bold">Dashboard</span>
    </div>
    <v-divider></v-divider>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'main',
})
export default class Dashboard extends Vue {}
</script>
