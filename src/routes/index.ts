import { createRouter, createWebHistory } from 'vue-router'
import { UserService } from '@/services/user.service'
import routes from './router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAdmin) {
    try {
      const response = await UserService.perfil()
      if (response.usuario.tipo === 'administrador') {
        next()
      } else {
        next({ name: 'Home' }) 
      }
    } catch (error) {
      if (requiresAuth || requiresAdmin) {
        next({ name: 'Home' })
      } else {
        next()
      }
      console.error(error)
       next({ name: 'Home' })  
    }
  } else {
    next()
  }
})

export default router
