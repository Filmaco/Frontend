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
  
} from 'lucide-vue-next'
import RioImage from '@/assets/imagens/rio.jpg'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  
  user: {
    name: 'Rio Vidal',
    email: 'm@example.com',
    avatar: RioImage,
  },
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
      name: 'Usuarios',
      url: '/usuarios',
      icon: Users,
    },
    {
      name: 'Videos',
      url: '#',
      icon: Users,
    },
   
  ],
}
</script>

<template>
  <div class="flex">
    <Sidebar v-bind="props" class="flex" style="">
      <SidebarHeader>
        <span>ADM</span>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects :projects="data.projects" />
        <!-- <NavMain :items="data.navMain" /> -->
      </SidebarContent>
      <SidebarRail />
    </Sidebar>

  </div>
</template>

