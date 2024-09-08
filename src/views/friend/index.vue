<template>
  <nav-bar :title="$t('demo.tabbar.friend')"></nav-bar>
  <div class="friend">
    <!--  顶部选项卡栏-->
    <div class="friend-tab">
      <div
        class="tab-item"
        @click="clickTab(0)"
        :class="currentTab == 0 ? 'active' : ''"
      >
        邀请
      </div>
      <div
        class="tab-item"
        @click="clickTab(1)"
        :class="currentTab == 1 ? 'active' : ''"
      >
        社区
      </div>
    </div>
    <!--    链接复制成功弹窗-->
    <div class="friend-copy">
      <img src="@/assets/friend/hook.svg" alt="" />
      <span>链接已复制</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { ref } from 'vue'

const currentTab = ref(0) //当前tab
const clickTab = (index: number) => {
  currentTab.value = index
}
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
