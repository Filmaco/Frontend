import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/views/Home.vue'
import Inicial from '../components/views/Inicial.vue'
import Cadastro from '../components/views/autenticacao/Cadastro.vue'
import ListaUsuario from '@/components/views/admin/ListaUsuario.vue'
import DefaultLayout from '@/components/views/DefualtLayout.vue'
import Login from '@/components/views/autenticacao/Login.vue'
import RedefinicaoSenha from '@/components/views/autenticacao/RedefinicaoSenha.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout, 
    children: [
     
      { path: '/home', component: Home },
      { path: '/usuarios', component: ListaUsuario },
    ]
  },
  { path: '/cadastro', component: Cadastro },
  { path: '/login', component: Login },
  { path: '/redefinir', component: () => RedefinicaoSenha,
    props: (route) => ({ oobCode: route.query.oobCode }) },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
