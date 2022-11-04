import PouchDB from 'pouchdb'
import PouchDBAuthentication from 'pouchdb-authentication'
import { Plugin, Context } from '@nuxt/types'

PouchDB.plugin(PouchDBAuthentication)

const db = new PouchDB('http://localhost:3001/store2go', { skip_setup: true })
const local = new PouchDB('store2go_local')
export class PouchDBPlugin {
  constructor(private context: Context) {}

  getInfo() {
    return db.info()
  }

  syncDB() {
    local
      .sync(db, { live: true, retry: true })
      .on('error', console.log.bind(console))
  }
}

const pouchDBPlugin: Plugin = function (context, inject) {
  inject('db', new PouchDBPlugin(context))
}

export default pouchDBPlugin
