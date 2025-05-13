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
import DynamicIcon from './DynamicIcon.vue'

const iconSize = 50

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton as-child>
              <a  class="font-medium text-white">
                <component :is="item.icon" v-if="item.icon" style="width: 20px; height: 20px; "/>
                <span style="">{{ item.title }}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub >
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child >
                 
                  <a :href="childItem.url">
                    <component :is="childItem.icon" v-if="childItem.icon" style="width: 20px; height: 20px; "/>
                    <span class="">{{ childItem.title }}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
     
    </SidebarMenu>
  </SidebarGroup>
</template>
