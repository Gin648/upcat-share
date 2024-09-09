<template>
  <div class="friend-tab" v-if="type==1">
    <div
        class="tab-item"
        :class="{ 'active': value === item.value }"
        v-for="item in list"
        :key="item.value"
        @click="emits('onChange', item.value)"
    >
      {{ item.text }}
    </div>
  </div>
  <div class="friend-tab1" v-else>
    <div
        class="tab-item1"
        :class="{ 'active1': value === item.value }"
        v-for="item in list"
        :key="item.value"
        @click="emits('onChange', item.value)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    default: () => [],
  },
  value: {
    type: Number,
    default: null,
  },
  type: {
    type: Number,
    default: 1 //1 顶部tab 2下方列表tab ,
  },
})

const emits = defineEmits(['onChange'])
</script>

<style scoped lang="less">
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


}

.active {
  background-color: #292d34;
}

.friend-tab1 {
  display: flex;
  border-radius: 30px;
}

.tab-item1 {
  background-color: #191A1C;
  padding: 4px 20px;
  border-radius: 20px;
  margin-right: 12px;
  transition: all 0.2s;
}

.active1 {
  background-color: #1BA0FF;
  padding: 4px 14px;
}
</style>
