// plugins/pocketbase.js
import PocketBase, { type AuthModel } from 'pocketbase'
import type { TypedPocketBase } from '../types/pocketbase-types'

type Cookie = {
  token: string
  model?: AuthModel
}

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const pb = new PocketBase(runtimeConfig.public.pocketbase_base_url || 'http://127.0.0.1:8090') as TypedPocketBase

  const cookie = useCookie<Cookie>('pb_auth', {
    path: '/',
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800
  })

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token, cookie.value?.model)

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model
    }
  })

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && await pb.collection('users').authRefresh()
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear()
  }

  return {
    provide: { pb }
  }
})
