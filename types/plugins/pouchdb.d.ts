import '@nuxt/types'
import PouchDb from 'pouchdb'

export interface PouchDBPluginImp {
  db: NotWellDefinedObject
  local: NotWellDefinedObject

  getInfo(): Promise<NotWellDefinedObject>
  syncDB(): void
  signIn(
    username: string,
    password: string
  ): Promise<NotWellDefinedObject | void>
}
