<template>
  <n-dropdown :options="options" @select="handleSelect">
    <hover-container class="h-full px-12px">
      <div class="flex-center cursor-pointer">
        <img :src="userStore.userInfo.avatar || avatar" class="mr-10px h-35px w-35px rounded-1/2">
        <span class="max-w-180px truncate">{{ userStore.userInfo.userName }}</span>
      </div>
    </hover-container>
  </n-dropdown>
</template>

<script setup lang="ts">
import avatar from '@/assets/svg-icons/avatar.svg'
import { useSvgIcon } from '@/hooks'
import { useAuthStore } from '@/store'

defineOptions({ name: 'UserAvatar' })

const userStore = useAuthStore()
const router = useRouter()
const options = [
  {
    label: '个人中心',
    key: 'zone',
    icon: useSvgIcon({ icon: 'el:user', iconFontSize: 16 }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: useSvgIcon({ icon: 'line-md:logout', iconFontSize: 16 }),
  },
]
function handleSelect(key: 'zone' | 'logout') {
  if (key === 'logout') {
    window.$dialog?.info({
      title: '提示',
      content: '确认退出？',
      positiveText: '确定',
      negativeText: '取消',
      maskClosable: false,
      onPositiveClick() {
        userStore.logout()
      },
    })
  }
  else if (key === 'zone') {
    router.push('/userZone/index')
  }
}
</script>
