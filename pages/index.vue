<template>
  <div>
    <h1>Hello from default page</h1>
    <UButton @click="$pb.authStore.clear();$router.go(0)">
      Logout
    </UButton>
  </div>
</template>
