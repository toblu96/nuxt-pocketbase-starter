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
  }
})
