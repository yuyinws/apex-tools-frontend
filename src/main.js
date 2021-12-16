import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.css'
import '@/assets/iconfont/iconfont.css'
import { Loading } from 'vant'
import router from '@/router/index.js'

const app = createApp(App)
app.use(Loading)
app.use(router)
app.mount('#app')
