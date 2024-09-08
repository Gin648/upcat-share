<template>
  <!--  邀请组件-->
  <!--    链接复制成功弹窗-->
  <div class="friend-copy">
    <div class="text-copy-box">
      <img src="@/assets/friend/hook.svg" alt=""/>
      <span>链接已复制</span>
    </div>
    <span class="text-bg">Invite Friends</span>
    <img class="x-img" src="@/assets/friend/x.svg" alt="">
  </div>
  <!--    礼包分享-->
  <div class="friend-gift">
    <!--        顶部标题-->
    <div class="gift-title">
      <img src="@/assets/friend/gift.svg" alt="">
      <span>你和你的朋友都将获得礼包</span>
    </div>
    <!--      card中间-->
    <div class="gift-card">
      <div class="card-top">
        <div class="top-item">
          <div class="money">
            <span>$100</span>
            <span>IBO</span>
          </div>
          <div class="text">好友获得</div>
        </div>
        <div class="symbol">
          <img src="@/assets/friend/plus.png" alt="">
        </div>
        <div class="top-item">
          <div class="money">
            <span>$50</span>
            <span>IBO</span>
          </div>
          <div class="text">你获得</div>
        </div>
      </div>
      <van-divider dashed :style="{margin:'20px 0 10px'}"></van-divider>
      <div class="card-botoom">
        <img src="@/assets/friend/tag.png" alt="">
        <span>邀请好友可获得星星购买折扣</span>
      </div>
    </div>
    <!--      card按钮-->
    <div class="gift-button flex justify-between">
      <van-button class="shadow-btn-green w-[48%] " type="primary">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/share.png" alt="">
          <span>邀请好友</span>
        </div>
      </van-button>
      <van-button class="shadow-btn-primary w-[48%]" type="primary">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/copy.png" alt="">
          <span>复制链接</span>
        </div>
      </van-button>
    </div>
  </div>

  <!--    好友明细-->
  <div class="friend-list">
    <div class="mt-[16px] mb-2.5 text-[12px]">
      <span>好友明细</span>
    </div>
    <div class="friend-list-content">
      <div class="flex justify-between content-item mb-3 p-[9px]" v-for="(item,index) in 5" :key="index">
        <div class="flex">
          <img src="@/assets/friend/gift.svg" class="w-[34px] h-[34px]" alt="">
          <div class="flex flex-col ml-1.5">
            <div class="flex">
              <span class="text-[14px]">Binance CZ</span>
              <span class="text-[12px] opacity-60 ml-1">(Level 3)</span>
            </div>
            <div class="text-[12px]">
              08/22 2024
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-col items-center justify-center mr-5">
            <img class="w-[28px] h-[28px]" src="@/assets/friend/gift.svg" alt="">
            <img class="w-[10px] h-[10px]" src="@/assets/friend/hook-g.svg" alt="">
          </div>
          <div class="flex flex-col items-center justify-center">
            <img class="w-[28px] h-[28px]" src="@/assets/friend/frame.svg" alt="">
            <img class="w-[10px] h-[10px]" src="@/assets/friend/hook-g.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>


<style scoped lang="less">
.friend-copy {
  position: relative;
  display: flex;
  background-color: #292D34;
  align-items: center;
  border-radius: 40px;
  padding: 6px;
  margin-top: 16px;
  margin-bottom: 12px;

  .text-copy-box {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 12px;
    }
  }

  .text-bg {
    position: absolute;
    left: 20%;
    opacity: 0.05;
    font-weight: bold;
    font-size: 24px;
  }

  .x-img {
    position: absolute;
    right: 10px;

  }
}

.friend-gift {
  border-radius: 12px;
  background: #050506;
  padding: 12px 16px 20px;

  .gift-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;

    span {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .gift-card {
    background: url("@/assets/friend/card-bg.png") no-repeat;
    background-size: contain;
    padding: 20px 17px;

    .card-top {
      display: flex;

      .top-item {
        width: 45%;

        .money {
          //text-align: center;

          span {
            &:first-child {
              font-size: 26px;
              font-weight: bold;
            }

            &:last-child {
              font-size: 24px;
              margin-left: 10px;
            }
          }
        }

        .text {
          font-size: 14px;
          opacity: .6;
        }
      }

      .symbol {
        width: 10%;

        img {
          width: 16px;
          height: 16px;
          margin-top: 10px;
        }
      }

    }

    .card-botoom {
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}

.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4B4F55 0%, #232830 100%);
  }
}

</style>