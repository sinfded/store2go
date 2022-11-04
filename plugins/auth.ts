import { Plugin, Context } from '@nuxt/types'
import { AuthPluginImp, AuthRedirectUris } from '~/types/plugins/auth'
import PouchDB from 'pouchdb'
import PouchDBAuthentication from 'pouchdb-authentication'
import { NotifierPlugin } from '~/types/plugins/notifier'

PouchDB.plugin(PouchDBAuthentication)

export class AuthPlugin implements AuthPluginImp {
  db = new PouchDB('http://localhost:3001/store2go', {
    skip_setup: true,
  })
  local = new PouchDB('store2go_local')
  redirect: any = {}
  $notifier: NotifierPlugin
  authRedirectUris: AuthRedirectUris = {
    login: '/',
    logout: '/',
    auth: '/dashboard',
  }
  haveSession: boolean = false

  constructor(context: Context) {
    this.redirect = context.redirect
    this.$notifier = context.$notifier
  }

  get isLoggedIn() {
    this.getSession()
    if (this.haveSession) return true
    else return false
  }

  async signUp(
    username: string,
    password: string,
    userData: NotWellDefinedObject
  ): Promise<NotWellDefinedObject | void> {
    this.db
      .signUp(username, password)
      .then((res: NotWellDefinedObject) => console.log(res))
      .catch((err) => console.error(err))
  }

  async signIn(username: string, password: string): Promise<any> {
    this.db
      .logIn(username, password)
      .then((res: NotWellDefinedObject) => {
        if (res.ok) {
          this.redirect(this.authRedirectUris.auth)
          this.$notifier.notifierState = {
            iconName: 'mdi-check',
            color: 'success',
            message: `Login Successfully!`,
          }
        }
      })
      .catch((err: NotWellDefinedObject) => console.error(err))
  }

  signOut(): void {
    this.db
      .logOut()
      .then((res: NotWellDefinedObject) => {
        if (res.ok) this.redirect(this.authRedirectUris.logout)
      })
      .catch((err: NotWellDefinedObject) => console.error(err))
  }

  getSession() {
    this.db
      .getSession()
      .then((res: NotWellDefinedObject) => {
        console.log(res)
        if (!res.userCtx.name) this.haveSession = false
        else this.haveSession = true
      })
      .catch((err: NotWellDefinedObject) => {
        console.log(err)
        if (err) this.haveSession = false
      })
  }
}

const authPlugin: Plugin = function (context, inject) {
  inject('auth', new AuthPlugin(context))
}

export default authPlugin
