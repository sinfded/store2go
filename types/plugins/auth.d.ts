import '@nuxt/types'

export type AuthRedirectUris = {
  login: string
  logout: string
  auth: string
}

export interface AuthPluginImp {
  authRedirectUris: AuthRedirectUris
  isLoggedIn?: boolean
  haveSession: boolean

  signIn(
    username: string,
    password: string
  ): Promise<NotWellDefinedObject | void>
  signUp(
    username: string,
    password: string,
    userData: NotWellDefinedObject
  ): Promise<NotWellDefinedObject | void>
  signOut(): void
  getSession(): void
}
