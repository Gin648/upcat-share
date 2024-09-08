import { defineStore } from 'pinia'

const studyStore = defineStore('study', {
  state: () => {
    return {
      learningCoinAmount: 0,
      myInterval: null,
    }
  },
  getters: {},
  actions: {
    changeCoin(val, Hour?: any) {
      this.learningCoinAmount = val
      if (Hour) {
        clearInterval(this.myInterval)
        this.myInterval = setInterval(() => {
          const addCoinNumber = Hour / (60 * 60)
          this.learningCoinAmount = this.learningCoinAmount + addCoinNumber
        }, 1000)
      }
    },
    clearCoinInterval() {
      this.learningCoinAmount = 0
      this.myInterval = null
      clearInterval(this.myInterval)
    },
  },
})

export default studyStore
