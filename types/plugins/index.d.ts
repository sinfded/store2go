import { NotifierPlugin } from '@/types/plugins/notifier'
import { PouchDBPluginImp } from './pouchdb'
import { AuthPluginImp } from './auth'

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
  }

  interface Context {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
  }
}
