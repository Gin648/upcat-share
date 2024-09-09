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
    changeCoin(val, addVal?: any) {
      this.learningCoinAmount = val
      if (addVal) {
        clearInterval(this.myInterval)
        this.myInterval = setInterval(() => {
          this.learningCoinAmount = this.learningCoinAmount + addVal
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
