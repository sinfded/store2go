<template>
  <v-snackbar
    app
    timeout="1500"
    ref="snackbar"
    light
    color="transparent"
    v-model="$notifier.notifierState.isNotifierEnabled"
    elevation="0"
    bottom
    dense
  >
    <v-sheet class="pa-0" rounded="lg" elevation="4">
      <v-row class="pa-2 align-center" no-gutters>
        <v-col cols="auto" class="mr-4">
          <v-icon size="32" :color="$notifier.notifierState.color">{{
            $notifier.notifierState.iconName
          }}</v-icon>
        </v-col>
        <v-col>
          <strong class="font-weight-medium text-subtitle-1">{{
            $notifier.notifierState.message
          }}</strong>
        </v-col>
      </v-row>
    </v-sheet>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class NotificationToast extends Vue {}
</script>
