<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
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

const props = defineProps<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>()

const route = useRoute()
</script>

<template>
  <SidebarGroup>
    <SidebarMenu 
    :class="{
       'group-data-[collapsible=icon]:mt-[2vw]': true,
       
    }"
    >
      <SidebarMenuItem
        v-for="project in projects"
        :key="project.name"
      >
        <router-link
          :to="project.url"
          class="flex items-center  gap-2 w-full text-white pt-1 h-[40px] rounded-md"
          :class="{
              'bg-[#A675E6]': route.path === project.url, 
              'hover:bg-[#A675E6]': route.path !== project.url,
              'hover:bg-[#513188]': route.path === project.url,
             
          }"
        >
          <SidebarMenuButton
            :tooltip="project.name"
            class=" justify-start w-[200px] "
            :class="{
              //'text-[#906BD2]': route.path !== project.url,
              'group-data-[collapsible=icon]:justify-center': true,
              'group-data-[collapsible=icon]:gap-0': true,
              'group-data-[collapsible=icon]:w-[48px]': true,

              
            }"
          >
            <component
              :is="project.icon"
              v-if="project.icon"
              :style="{ width: '24px', height: '24px', padding: '2px' }"
              :class="{
                'text-white': route.path !== project.url,
                
                'w-8': true,
                'h-8': true,
              }"
            />
            <span>{{ project.name }}</span>
          </SidebarMenuButton>
        </router-link>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
