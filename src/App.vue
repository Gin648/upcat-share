<template>
  <router-view v-if="isCanNext && imgLoaded" id="el" class="h-full overflow-y-scroll" />
  <NewbiePack v-if="isCanNext && imgLoaded"></NewbiePack>
  <LoadPage v-else></LoadPage>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { telegramMiniAuth } from '@/services/telegram'
import NewbiePack from '@/components/NewbiePack/index.vue'
import LoadPage from '@/components/LoadPage/index.vue'
const { accountStore } = useStore()
import router from '@/router/index'
const route = useRoute()

const imgLoaded = ref(false)
const img = new Image()
img.src = '/public/cat.png'
img.onload = function () {
  // 图片已加载完成，可以进行相关操作
  imgLoaded.value = true
}

const isCanNext = ref(false)
const initTelegram = async () => {
  if (window.Telegram?.WebApp.initData) {
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.setHeaderColor('#000000')
  }
  if (
    window.Telegram?.WebApp.initData &&
    window.Telegram?.WebApp.initData !== 'user' &&
    window.Telegram?.WebApp.initData !== 'query_id'
  ) {
    let invitationCode = ''
    let teamId = ''
    const startData = window.Telegram.WebApp.initDataUnsafe?.start_param
    if (startData) {
      invitationCode = startData.split('_')[0]
      teamId = startData.split('_')[1]
    }
    isCanNext.value = false

    const { code, data }: any = await telegramMiniAuth({
      invitationCode: invitationCode,
      initData: window.Telegram?.WebApp.initData,
    })
    if (code === 200) {
      accountStore.changeToken(data.token)
      accountStore.changeUserInfo()
      if (teamId) {
        await router.replace({
          path: '/friend/communityDetails',
          query: { id: teamId },
        })
      } else if (route?.path === '/login') {
        await router.replace('/home')
      }
      isCanNext.value = true
    } else {
      accountStore.changeToken('')
      isCanNext.value = true
    }
  } else {
    await accountStore.changeUserInfo()
    isCanNext.value = true
  }
}

onBeforeMount(async () => {
  // 展开最大高度

  await initTelegram()
})
</script>

<style></style>
