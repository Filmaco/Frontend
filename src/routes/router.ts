import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Inicial from '@/views/Inicial.vue'
import Cadastro from '@/views/autenticacao/Cadastro.vue'
import ListaUsuario from '@/views/admin/ListaUsuario.vue'
import Login from '@/views/autenticacao/Login.vue'
import RedefinicaoSenha from '@/views/autenticacao/RedefinicaoSenha.vue'
import DefaultLayout from '@/views/DefaultLayout.vue'
import AdicionarVideo from '@/views/videos/AdicionarVideo.vue'
import PerfilUsuario from '@/views/user/PerfilUsuario.vue'
import Video from '@/views/videos/Video.vue'
import EditUsuario from '@/views/user/EditUsuario.vue'
import MeusVideos from '@/views/user/MeusVideos.vue'
import ListaPlaylists from "@/views/playlist/ListaPlaylists.vue";
import Playlist from '@/views/playlist/Playlist.vue'
import EditarPlaylist from '@/views/playlist/EditarPlaylist.vue'
import HomeADM from '@/views/HomeADM.vue'
import { UserService } from '@/services/user.service'
import MeuPerfil from '@/views/user/MeuPerfil.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
       {
        path: '',
        name: 'Home.ADM',
        component: HomeADM,
        meta: {
          requiresAdmin: true,
          
          requiresAuth: true
        }
      },
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
        }
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: ListaUsuario,
        meta: {
          requiresAdmin: true,
          
        }
      },
      {
        path: 'video/add',
        name: 'Video.Add',
        component: AdicionarVideo,
        meta: {
        }
      },
      {
        path: 'video/:id',
        name: 'Video.Visualizar',
        component: Video,
        props: true,
        meta: {
        }
      },
      {
        path: 'perfil/:id',
        name: 'Usuario.Perfil',
        component: PerfilUsuario,
        meta: {
        }
      },
      {
        path: 'meu/perfil',
        name: 'Usuario.Meu.Perfil',
        component: MeuPerfil,
        meta: {
        }
      },
      {
        path: 'editar/:id',
        name: 'Usuario.Editar',
        component: EditUsuario,
        meta: {
           requiresAuth: true
        }
      },
      {
        path: 'meus/videos',
        name: 'Usuario.videos',
        component: MeusVideos,
        meta: {
        }
      },
      {
        path: 'playlists',
        name: 'Playlist',
        component: ListaPlaylists,
        meta: {
        }
      },
      {
        path: 'playlist/:id',
        name: 'Playlist.Id',
        component: Playlist,
        meta: {
        }
      },
       {
        path: 'playlist/editar/:id',
        name: 'Playlist.Editar',
        component: EditarPlaylist,
        meta: {
        }
      },
      
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Inicial,
    meta: {
    },
  },
  {
    path: '/cadastro',
    name: 'Auth.Cadastro',
    component: Cadastro,
    meta: {
     
    }
  },
  {
    path: '/login',
    name: 'Auth.Login',
    component: Login,
    meta: {
      
    }
  },
  {
    path: '/redefinir',
    name: 'Auth.Redefinir.Senha',
    component: RedefinicaoSenha,
    props: (route) => ({ oobCode: route.query.oobCode }),
    meta: {
     
    }
  }
]

export default routes
