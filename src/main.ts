import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import router from './router'
import directive from './directive'

const app = createApp(App)

directive(app)
app.use(router)
app.mount('#app')
