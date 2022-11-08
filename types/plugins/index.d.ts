import { NotifierPlugin } from '@/types/plugins/notifier'
import { PouchDBPluginImp } from './pouchdb'
import { AuthPluginImp } from './auth'
import { FormatPlugin } from './format'
import { InventoryPlugin } from './inventory'

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPlugin
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPlugin
  }

  interface Context {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPlugin
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notifier: NotifierPlugin
    $db: PouchDBPluginImp
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPlugin
  }
}
