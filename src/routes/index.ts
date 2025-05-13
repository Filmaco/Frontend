import VueRouter, {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import TokenService from '@/services/storage.service'
import routes from './router'
import { UserService } from '@/services/user.service'

const router = createRouter(<RouterOptions>
{
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.meta.requiresAdmin;

  if (!requiresAdmin) return next();

  try {
    const perfil = await UserService.perfil();
    //console.log('perfil:', perfil.usuario.tipo);
    
    if (perfil.usuario.tipo === 'administrador') {
      console.log('opa, deu certo', perfil.usuario.tipo);
      
      return next();  
      
    } else {
      console.log('opa, nao deu certo', perfil.usuario.tipo );
      return next({ name: 'Home' });
      
    }
  } catch (err) {
    console.warn('Usuário não autenticado ou erro no perfil:', err);
    return next({ name: 'Home' }); 
  }
});


export default router
