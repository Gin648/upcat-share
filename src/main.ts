import { createApp } from 'vue'
import { store } from './store'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vant/touch-emulator'
import Vue3TouchEvents from 'vue3-touch-events'
// normalize.css
import 'normalize.css/normalize.css'
// 全局样式
import './styles/index.less'
// tailwindcss
import './styles/tailwind.css'
// svg icon
import 'virtual:svg-icons-register'
// i18n
import i18n from './locales'

import App from './App.vue'
import router from './router'
import 'vant/es/toast/style'

const app = createApp(App)
store.use(piniaPluginPersistedstate)
app.use(store)
app.use(router)
app.use(i18n)
app.use(Vue3TouchEvents)

app.mount('#app')
