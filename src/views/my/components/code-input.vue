<template>
  <div class="input-box">
    <div class="code-item" :class="codeValue.length == 0 && inputFocus ? 'code-item-active' : ''">{{ codeValue[0] }}
    </div>
    <div class="code-item" :class="codeValue.length == 1 && inputFocus ? 'code-item-active' : ''">{{ codeValue[1] }}
    </div>
    <div class="code-item" :class="codeValue.length == 2 && inputFocus ? 'code-item-active' : ''">{{ codeValue[2] }}
    </div>
    <div class="code-item" :class="codeValue.length == 3 && inputFocus ? 'code-item-active' : ''">{{ codeValue[3] }}
    </div>
    <div class="code-item" :class="codeValue.length == 4 && inputFocus ? 'code-item-active' : ''">{{ codeValue[4] }}
    </div>
    <div class="code-item" :class="codeValue.length == 5 && inputFocus ? 'code-item-active' : ''">{{ codeValue[5] }}
    </div>
    <input
        class="input-code"
        v-model="codeValue"
        :maxlength="6"
        type="tel"
        @blur="codeInputBlur"
        @focus="codeInputFocus"
        @input="codeInputChange"/>
  </div>

</template>

F
<script>
export default {
  data() {
    return {
      time: 0,
      codeValue: '',
      inputFocus: false,
    }
  },
  created() {
    this.getVerifyCode();
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      this.time = 120;
      const timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.time = 0;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 验证码输入框input
    codeInputChange() {
      if (this.codeValue && this.codeValue.length >= 6) {
        this.$emit('codeInputChange', this.codeValue)
      }
    },
    // 验证码输入框失去焦点
    codeInputBlur() {
      this.inputFocus = false;
    },
    // 验证码输入框获取到焦点
    codeInputFocus() {
      this.inputFocus = true;
    },
  }
}
</script>


<style lang="less">

.input-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  //margin-top: 80px;
  position: relative;
  padding: 0px 15px;
  box-sizing: border-box;

  .input-code {
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
    color: transparent;
    background-color: transparent;
    opacity: 0;
  }

  .code-item {
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 50px;
    background-color: #191A1C;
    margin-right: 10px;
    color: #fff;
    font-size: 34px;
    border-radius: 5px;
  }

  .code-item-active {
    border-bottom: 1px solid #209ff9;
  }
}

</style>