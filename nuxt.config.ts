// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    shim: false
  },
  modules: ['@nuxt/ui'],
  tailwindcss: {
    // disable viewer until @koa/router deps is updated - https://github.com/rogden/tailwind-config-viewer/issues/90
    viewer: false
  },
  runtimeConfig: {
    public: {
      pocketbase_base_url: 'http://127.0.0.1:8090'
    }
  }
})
