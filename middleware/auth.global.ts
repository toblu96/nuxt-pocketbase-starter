export default defineNuxtRouteMiddleware((to) => {
  const login: string = '/login'
  const exclude: string[] = [] // could be passed from public runtime config

  // Do not redirect on login route, callback route and excluded routes
  const isExcluded = [...exclude, login]?.some((path) => {
    const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
    return regex.test(to.path)
  })
  if (isExcluded) { return }

  const validUser = useNuxtApp().$pb.authStore.isValid
  if (!validUser) {
    return navigateTo(login)
  }
})
