import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import './assets/main.css'
import axios from 'axios' // 👉 importa o axios

const app = createApp(App)

app.use(router)

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

app.mount('#app')
