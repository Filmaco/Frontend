import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import axios from 'axios'
import router from './routes'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(router)

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


app.component('ApexChart', VueApexCharts)
app.mount('#app')
