<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import NavMain from './NavMain.vue'
import NavProjects from './NavProjects.vue'
import NavUser from './NavUser.vue'
import TeamSwircher from './TeamSwircher.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
  Star,
  Users,
  Bell,
  BellDot,
  CircleUser,
  Clock9,
  Compass,
  Drama,
  Flame,
  Music4,
  Clapperboard,
  Gamepad,
  Trophy,
  GraduationCap,
  Podcast,
  Play
  
} from 'lucide-vue-next'
import RioImage from '@/assets/imagens/rio.jpg'
// import logo_mobile_branca from '../assets/logos/logo_1_branca.png'
import { useSidebar } from '@/components/ui/sidebar'
import router from '@/routes'
import NavUserSidebar from '@/components/NavUserSidebar.vue'
import { UserService } from '@/services/user.service'
import { ref, onMounted } from 'vue'
const { state } = useSidebar()

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

interface User{
  name: string,
  email: string;
  avatar: string
}

const user = ref({
  usuario_id: 0,
  name: '',
  email: '',
  avatar: '',
})


onMounted(async () => {
  try {
    const response = await UserService.perfil()
    user.value = {
      usuario_id: response.usuario_id,
      name: response.usuario.nome_completo,
      email: response.usuario.email,
      avatar: response.usuario.foto_perfil
    }
    console.log(user);
    
    
  } catch (e) {
    console.error('Erro ao carregar perfil:', e)
  }
})

function goHome() {
  router.push({ name: 'Home' })
}
// This is sample data.
const data = {
  
  // navMain: [
  //   {
  //     title: 'Explorar',
  //     url: '#',
  //     icon: Compass,
  //     isActive: false,
  //     items: [
  //       {
  //         title: 'Musica',
  //         url: '#',
  //         icon: Music4,
  //       },
  //       {
  //         title: 'Filme',
  //         url: '#',
  //         icon: Clapperboard,
  //       },
  //       {
  //         title: 'Jogos',
  //         url: '#',
  //         icon: Gamepad,
  //       },
  //       {
  //         title: 'Esportes',
  //         url: '#',
  //         icon: Trophy,
  //       },
  //       {
  //         title: 'Cursos',
  //         url: '#',
  //         icon: GraduationCap,
  //       },
  //       {
  //         title: 'Podcasts',
  //         url: '#',
  //         icon: Podcast,
  //       },
  //     ],
  //   },
  // ],
  projects: [
    {
      name: 'Inicio',
      url: '/',
      icon: Home,
    },
    {
      name: 'Meus Videos',
      url: '/meus/videos',
      icon: Play,
    },
    {
      name: 'Playlists',
      url: '/playlists',
      icon: Users,
    },
    {
      name: 'Minhas Playlists',
      url: '/minhas/playlists',
      icon: Users,
    },
     {
      name: 'Buscar',
      url: '/busca/avancada',
      icon: Compass,
    },
  ],
}

</script>

<template>
  <div class="flex">
    <Sidebar v-bind="props" class="flex justify-center" style="">
      <SidebarHeader class="flex items-center justify-center">
        <img v-if="state === 'collapsed'"
         src="../assets/logos/logo_1_branca.png"
          width="60px" height="60px"
          class="mt-[3vw]"
          @click="goHome()"
          style="cursor: pointer;"
          />
         <img v-else 
         src="../assets/logos/logo_3_branca.png"
          width="150px" height="auto"
          class="ml-10"
          @click="goHome()"
          style="cursor: pointer;"
          />
      </SidebarHeader>
      <SidebarContent class="h-full flex justify-between pb-10">
        <NavProjects :projects="data.projects" />
        <NavUserSidebar :user="user" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>

  </div>
</template>

