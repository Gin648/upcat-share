<template>
  <div>
    <nav-bar :left-arrow="false" title="朋友"></nav-bar>
    <div class="friend">
      <!--    邀请-->
      <friend-invitation></friend-invitation>
    </div>
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { onBeforeMount, onMounted, ref } from 'vue'
import FriendInvitation from '@/views/friend/components/friendInvitation.vue'
import { queryUserTeamInfo } from '@/services/study'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const currentTab = ref(0) //当前tab
const clickTab = (index: number) => {
  router.replace({
    path: '/friend',
    query: { tab: index },
  })
  currentTab.value = index
}

const userTeamInfo = ref(null)
const _queryUserTeamInfo = async () => {
  const { success, data } = await queryUserTeamInfo()
  if (success) {
    userTeamInfo.value = data || null
  }
}

onBeforeMount(() => {
  currentTab.value = route.query.tab ? Number(route.query.tab) : 0
})

onMounted(async () => {
  await _queryUserTeamInfo()
})

router.beforeEach((to, from) => {
  // 动态删除keep-alive缓存
  if (to.path === '/friend') {
    if (from.params.refresh) {
      _queryUserTeamInfo()
    }
  }
})
</script>

<style scoped lang="less">
.friend {
  padding: 0 16px;
}

.friend-tab {
  display: flex;
  height: 52px;
  padding: 12px;
  background-color: #000;
  border-radius: 12px;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;

  .tab-item {
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    border-radius: 10px;
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .active {
    background-color: #292d34;
  }
}
</style>
