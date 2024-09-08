<template>
  <nav-bar :title="$t('demo.tabbar.friend')"></nav-bar>
  <div class="friend">
    <!--  顶部选项卡栏-->
    <div class="friend-tab">
      <div class="tab-item" @click="clickTab(0)" :class="currentTab == 0 ? 'active' : ''">
        邀请
      </div>
      <div class="tab-item" @click="clickTab(1)" :class="currentTab == 1 ? 'active' : ''">
        社区
      </div>
    </div>
    <!--    邀请-->
    <template v-if="currentTab == 0">
      <friend-invitation></friend-invitation>
    </template>
    <!--    社区组件-->
    <template v-else>
      <!--      <friend-community></friend-community>-->
      <friend-yes-community></friend-yes-community>
    </template>
  </div>
</template>
<script setup lang="ts">
import {$t} from '@/locales'
import {onMounted, ref} from 'vue'
import FriendInvitation from "@/views/friend/components/friendInvitation.vue";
import FriendCommunity from "@/views/friend/components/friendNoCommunity.vue";
import {getFriendListApi} from "@/services/friend";
import FriendYesCommunity from "@/views/friend/components/friendYesCommunity.vue";

const currentTab = ref(0) //当前tab
const clickTab = (index: number) => {
  currentTab.value = index
}
onMounted(async () => {
  // const res = await getFriendListApi()
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
