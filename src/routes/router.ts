import { createRouter, createWebHistory } from 'vue-router'

import Cadastro from '@/components/views/autenticacao/Cadastro.vue'
import Inicial from '@/components/views/Inicial.vue'
import Home from '@/components/views/Home.vue'

const routes = [
  { path: '/cadastro', component: Cadastro },
  { path: '/', component: Inicial },
  { path: '/home', component: Home },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
