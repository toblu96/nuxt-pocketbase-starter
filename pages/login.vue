<template>
  <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="login">
        <div class="space-y-2">
          <div>
            <label for="username" class="sr-only">Email address</label>
            <UInput
              id="username"
              v-model="username"
              name="username"
              autocomplete="username"
              required
              placeholder="Username"
              autofocus
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <UInput
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <UButton block type="submit">
            Sign in
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClientResponseError } from 'pocketbase'

const pb = useNuxtApp().$pb
const toast = useToast()

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const { token } = await pb.collection('users').authWithPassword(username.value, password.value)

    if (token) {
      await navigateTo('/')
    }
  } catch (e) {
    const error = e as ClientResponseError
    toast.add({ title: 'Auth Error', description: error.message, color: 'yellow', icon: 'i-heroicons-exclamation-triangle' })
  }
}
</script>
