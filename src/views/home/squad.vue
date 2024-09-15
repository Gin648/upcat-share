<template>
  <div>
    <nav-bar :title="t('xiao-dui')"></nav-bar>
    <div class="friend">
      <friend-yes-community
        v-if="userTeamInfo && userTeamInfo.teamId"
        :info="userTeamInfo"
        @init="_queryUserTeamInfo"
      ></friend-yes-community>

      <friend-community v-else @init="_queryUserTeamInfo"></friend-community>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { onMounted, ref } from 'vue'
import FriendCommunity from '@/views/friend/components/friendNoCommunity.vue'
import { queryUserTeamInfo } from '@/services/study'
import FriendYesCommunity from '@/views/friend/components/friendYesCommunity.vue'
import { useRoute, useRouter } from 'vue-router'
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const route = useRoute()
const router = useRouter()

const userTeamInfo = ref(null)
const _queryUserTeamInfo = async () => {
  const { success, data } = await queryUserTeamInfo()
  if (success) {
    userTeamInfo.value = data || null
  }
}

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
