import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Inicial from '@/views/Inicial.vue'
import Cadastro from '@/views/autenticacao/Cadastro.vue'
import ListaUsuario from '@/views/admin/ListaUsuario.vue'
import Login from '@/views/autenticacao/Login.vue'
import RedefinicaoSenha from '@/views/autenticacao/RedefinicaoSenha.vue'
import DefaultLayout from '@/views/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout, 
    children: [
     
      { path: '/home', component: Home },
      { path: '/usuarios', component: ListaUsuario },
    ]
  },
  { path: '/auth', component: Inicial },
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
