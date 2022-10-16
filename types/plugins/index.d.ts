import { NotifierPlugin } from '@/types/plugins/notifier'

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: NotifierPlugin
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notifier: NotifierPlugin
    $db: any
  }

  interface Context {
    $notifier: NotifierPlugin
    $db: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notifier: NotifierPlugin
    $db: any
  }
}
