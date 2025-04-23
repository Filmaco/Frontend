import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/views/Home.vue'
import Inicial from '../components/views/Inicial.vue'
import Cadastro from '../components/views/autenticacao/Cadastro.vue'
import ListaUsuario from '@/components/views/admin/ListaUsuario.vue'

const routes = [
  { path: '/cadastro', component: Cadastro },
  { path: '/', component: Inicial },
  { path: '/home', component: Home },
  { path: '/usuarios', component: ListaUsuario },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
