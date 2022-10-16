import PouchDB from 'pouchdb'
import { Plugin } from '@nuxt/types'

const db = new PouchDB('http://localhost:5984/store2go')

const pouchDBPlugin: Plugin = function (_, inject) {
  inject('db', db)
}

export default pouchDBPlugin
