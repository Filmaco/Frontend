<script lang="ts">
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import { AlignJustify } from "lucide-vue-next";
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
  Search,
  Plus,
  Check
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import AdicionarVideo from "./videos/AdicionarVideo.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import NavUser from "@/components/NavUser.vue";
import RioImage from '@/assets/imagens/rio.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from "@/lib/utils";
import { RouterView } from "vue-router";
import { UserService } from "@/services/user.service";
import TokenService from "@/services/storage.service";
import { userInfo } from "os";

export default {
  components: {
    SidebarProvider, 
    SidebarTrigger,
    AppSidebar,
    BellDot,
    Input,
    Search,
    Plus,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    AdicionarVideo,
    Separator,
    NavUser,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    cn,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch
  },
  data() {
    return {
      data: {
        user: {
          id: null,
          nome_completo: '',
          email: '',
          avatar: '',
          tipo: ''
        },
        notifications : [
          {
            title: 'Your call has been confirmed.',
            description: '1 hour ago',
          },
          {
            title: 'You have a new message!',
            description: '1 hour ago',
          },
          {
            title: 'Your subscription is expiring soon!',
            description: '2 hours ago',
          },
        ],
        //token: TokenService.getToken()
      },
      isMobile: useSidebar,
      cn
    }
  },
  mounted() { 
    UserService.perfil()
      .then(user => {
        this.data.user = user.usuario;
        // console.log('user: ', this.data.user);
        
      })
      .catch((e) => {
          console.log(e);
          
      });
  },
  computed: {
    token() {
      //console.log(TokenService.getToken());
      
      return TokenService.getToken();
    }
  },
  
}

</script>

<template>
  <SidebarProvider class="">
   
    <AppSidebar />
    <SidebarInset class="w-[100%]">
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4 w-[84vw]">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          
          <div class="flex justify-between w-full">
            <div class="w-[40%]">
              <div class="relative w-full max-w-sm items-center">
                <Input id="search" type="text" placeholder="Pesquisar..." class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Search class="size-4 text-muted-foreground" />
                </span>
              </div>
            </div>
            <div class="flex content-center items-center gap-2">
              <AlertDialog >
                <AlertDialogTrigger as-child>
                  <Button variant="outline" class="flex py-2 px-4 gap-1" style="border: 1px; border-radius: 10px; background: #7E57C2; cursor: pointer;">
                      <Plus color="white"/>
                      <p class="text-white">Criar</p>
                  </Button>
                </AlertDialogTrigger>
                
                <AlertDialogContent class="max-w-[900px]">
                  <div class="w-full flex justify-between ">
                    <p class="text-2xl mb-5 ml-2">Adicionar novo video</p>
                    <div>
                      <AlertDialogCancel class="border-0 bg-transparent w-[10px]">X</AlertDialogCancel>
                  </div>
                  </div>
                  
                  <Separator orientation="horizontal" class="w-[95%] ml-[-7px]" />
                  <AdicionarVideo/>
                </AlertDialogContent>
              </AlertDialog>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>     
                  <BellDot :size="20" style="cursor: pointer;" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                class="w-[--reka-dropdown-menu-trigger-width] min-w-[390px] rounded-[20px] border-transparent bg-transparent shadow-[0px]" style="border-radius: 20px;"
                side="bottom"
                align="end"
                
                >
                <Card :class="cn('w-[380px]', $attrs.class ?? '')" >
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>You have 3 unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                      <div class=" flex items-center space-x-4 rounded-md border p-4">
                        <Bell />
                        <div class="flex-1 space-y-1">
                          <p class="text-sm font-medium leading-none">
                            Push Notifications
                          </p>
                          <p class="text-sm text-muted-foreground">
                            Send notifications to device.
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div>
                        <div
                          v-for="(notification, index) in data.notifications" :key="index"
                          class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0"
                        >
                          <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div class="space-y-1">
                            <p class="text-sm font-medium leading-none">
                              {{ notification.title }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                              {{ notification.description }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button class="w-full">
                        <Check class="mr-2 h-4 w-4" /> Mark all as read
                      </Button>
                    </CardFooter>
                  </Card>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div v-if="token">
              <div >
                <NavUser :user="data.user" />
              </div>          
            </div>
            <div class="" v-else>
              <RouterLink to="/login">
                <Button variant="outline" class="py-2 px-4" style="border-radius: 10px; cursor: pointer;">
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/cadastro">
                <Button variant="secondary" class="py-2 px-4" style="border-radius: 10px; cursor: pointer;">
                  Cadastrar
                </Button>
              </RouterLink>
            </div>
            </div>
          </div>
         
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4  pt-0">
        <RouterView />
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" ></div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
