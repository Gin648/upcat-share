<template>
  <!--没有加入社区组件-->
  <div
    class="friend-community-title flex items-center justify-between mb-[16px] mt-[16px]"
  >
    <div>{{ t('jia-ru-xiao-dui') }}</div>
    <div class="flex items-center" @click="onFresh">
      <img
        class="w-[20px] h-[20px] mr-1"
        :class="{ 'spin-element': refreshLoading }"
        src="@/assets/friend/refresh.png"
      />
      <span class="text-[#1BA0FF]">{{ t('huan-yi-huan') }}</span>
    </div>
  </div>
  <!--    社区明细-->
  <div class="friend-list">
    <div
      class="flex justify-between content-item mb-3 p-[9px]"
      v-for="(item, index) in teamNumSeniority"
      @click="handleTo(`/teamInfo?id=${item.teamId}`)"
      :key="index"
    >
      <div class="flex">
        <img
          :src="item.avatar || getImage('png/squad-default-icon.png')"
          class="w-[34px] h-[34px]"
        />
        <div class="flex flex-col ml-1.5">
          <div class="flex">
            <span class="text-[14px]">{{ item.name || 'Tom' }}</span>
          </div>
          <div class="flex items-center">
            <img
              src="@/assets/friend/team.svg"
              class="w-[12px] h-[12px]"
              alt=""
            />
            <span class="text-[12px] ml-1">{{ item.teamNum || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center text-[#1BA0FF] text-[16px] mr-2.5">
        {{ t('cha-kan-xiao-dui') }}
      </div>
    </div>

    <div class="flex justify-center" v-if="loading">
      <van-loading />
    </div>
  </div>
  <!--  社区底部按钮-->
  <div class="flex justify-center mt-10 gift-button pb-[20px]">
    <!--    <van-button class="shadow-btn-green w-[40%] mr-5 " type="primary" @click="clickButon('join')">-->
    <!--      <div class="flex items-center gap-[8px]">-->
    <!--        <img src="@/assets/friend/join.png" alt="">-->
    <!--        <span>加入社区</span>-->
    <!--      </div>-->
    <!--    </van-button>-->
    <van-button
      class="shadow-btn-primary w-[100%]"
      type="primary"
      @click="clickButon()"
    >
      <div class="flex items-center gap-[8px]">
        <img class="w-[29px]" src="@/assets/friend/create.png" alt="" />
        <span>{{ t('chuang-jian-huo-jia-ru-xiao-dui') }}</span>
      </div>
    </van-button>
  </div>
  <!--  弹窗-->
  <van-popup
    v-model:show="popupCfg.show"
    round
    class="van-popup--transparent"
    style="width: 90vw"
    @open="onOpenPop"
  >
    <div class="w-[100%]">
      <div class="common-linear w-[100%] py-[24px] px-[20px]">
        <div class="text-[20px] text-center mb-[24px]">
          {{ t('chuang-jian-huo-jia-ru-xiao-dui') }}
        </div>
        <div class="text-[12px] opacity-40 text-center mb-[24px]">
          {{ t('create-squad-tip-1') }}
          <br />
          {{ t('create-squad-tip-2') }}
        </div>
        <div class="field-grey mb-[44px]">
          <van-field
            :error="error"
            autocomplete="off"
            placeholder="t.me/Tomup or @Tomup"
            v-model="communityName"
          />
        </div>
        <div class="text-center w-100">
          <van-button
            :disabled="!communityName"
            :loading="btnLoading"
            class="w-2/3 shadow-btn-primary"
            type="primary"
            @click="handelPopupButton()"
          >
            <div class="flex items-center gap-[8px]">
              <img src="@/assets/friend/create.png" class="w-[28px]" />
              <span>{{ t('chuang-jian-huo-jia-ru-xiao-dui') }}</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { teamNumSeniorityPage, addTeam } from '@/services/study'
import { getImage } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['init'])

const popupCfg = ref({
  type: '',
  show: false,
})
const communityName = ref('') // 社区名称

// 点击加入社区
const handelPopupButton = async () => {
  onAddTeam({ telegramLink: communityName.value })
}

const btnLoading = ref(false)
// 加入小队
const onAddTeam = async (resq) => {
  btnLoading.value = true
  const resp = await addTeam(resq)
  btnLoading.value = false
  if (resp.success) {
    popupCfg.value.show = false
    emit('init')
  } else if (resp.code == 500) {
    onError()
  }
}

const onOpenPop = () => {
  error.value = false
  communityName.value = ''
}

const error = ref(false)
const onError = () => {
  error.value = true
  communityName.value = ''
}

//点击按钮
const clickButon = () => {
  popupCfg.value.show = true
}
const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}

const teamNumSeniority: any = ref([])
const loading = ref(false)
const _queryTeamNumSeniorityPage = async (load?: boolean) => {
  loading.value = load
  const { success, data }: any = await teamNumSeniorityPage()
  loading.value = false
  if (success) {
    teamNumSeniority.value = data.list || []
  }
}

const refreshLoading = ref(false)
const onFresh = async () => {
  refreshLoading.value = true
  await _queryTeamNumSeniorityPage()
  refreshLoading.value = false
}

onMounted(() => {
  _queryTeamNumSeniorityPage(true)
})
</script>

<style scoped lang="less">
.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4b4f55 0%, #232830 100%);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin-element {
  animation: spin 0.3s linear infinite;
  /* 其他样式，比如宽高、颜色等 */
}
</style>
