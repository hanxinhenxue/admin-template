<template>
  <div>
    <n-button v-throttle="handleSubmit" :loading="authStore.loginLoading">
      一键登录
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'
import { crypto } from '@/utils'

const authStore = useAuthStore()

async function handleSubmit() {
  const [username, password] = ['admin', crypto.encryptMd5('admin')]
  await authStore.loginHandle(username, password, true)
}
</script>

<style lang="scss" scoped>

</style>
