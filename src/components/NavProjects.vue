<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import router from '@/routes'

defineProps<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>()




</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="project in projects" :key="project.name">
        <router-link :to="project.url" class="flex items-center gap-2 w-full text-white">
          <SidebarMenuButton :tooltip="project.name" class="w-full justify-start">
            <component :is="project.icon" v-if="project.icon" style="width: 20px; height: 20px;" />
            <span>{{ project.name }}</span>
          </SidebarMenuButton>
        </router-link>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

