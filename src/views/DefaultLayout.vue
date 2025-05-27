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
import AppSidebarADM from "@/components/AppSidebarADM.vue";
import axios from "axios";import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

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
    Switch,
    AppSidebarADM,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
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
       isDialogOpen: false,
      isMobile: useSidebar,
      cn,
       user: {
        usuario_id : ''
      },
      video: {
        usuario_id: '',
        nome: '',
        descricao: '',
        tipo: '',
        genero: '',
        duracao: '',
        link: '',
        imagem: null as File | null,
        tags: []
      },

      erros: {
        nome: '',
        descricao: '',
        tipo: '',
        genero: '',
        duracao: '',
        link: '',
      },
      enviando: false,
      tipos: [
        { nome: "Documentário", id: "documentário" },
        { nome: "Música", id: "clipe musical" },
        { nome: "Filme", id: "longa-metragem" },
        { nome: "Curta-metragem", id: "curta-metragem" },
        { nome: "Vlog", id: "vlog" },
        { nome: "Anime", id: "anime" },
        { nome: "Série", id: "serie" },
        { nome: "Gameplay", id: "gameplay" },
        { nome: "Tutorial", id: "tutorial" },
        { nome: "Review", id: "review" },
        { nome: "Reação", id: "reacao" },
        { nome: "Podcast", id: "podcast" },
        { nome: "Entrevista", id: "entrevista" },
        { nome: "Comédia", id: "comedia" },
        { nome: "Notícia", id: "noticia" },
        { nome: "Educacional", id: "educacional" },
        { nome: "Ao vivo", id: "ao vivo" },
        { nome: "Cobertura de Evento", id: "cobertura de evento" },
        { nome: "Animação", id: "animacao" },
        { nome: "Experiência Social", id: "experiencia social" },
        { nome: "Unboxing", id: "unboxing" },
        { nome: "Viagem", id: "viagem" },
        { nome: "Lifestyle", id: "lifestyle" },
        { nome: "Motivacional", id: "motivacional" },
        { nome: "Paródia", id: "parodia" }

        ],
        generos: [
        { nome: "Natureza", tipoId: "documentário" },
        { nome: "História", tipoId: "documentário" },
        { nome: "Biografia", tipoId: "documentário" },
        { nome: "Científico", tipoId: "documentário" },
        { nome: "Investigativo", tipoId: "documentário" },
        { nome: "Cultural", tipoId: "documentário" },

        // Música
        { nome: "Rock", tipoId: "clipe musical" },
        { nome: "Pop", tipoId: "clipe musical" },
        { nome: "Jazz", tipoId: "clipe musical" },
        { nome: "Clássica", tipoId: "clipe musical" },
        { nome: "Eletrônica", tipoId: "clipe musical" },
        { nome: "Indie", tipoId: "clipe musical" },
        { nome: "Reggae", tipoId: "clipe musical" },

        // Longa-metragem
        { nome: "Ação", tipoId: "longa-metragem" },
        { nome: "Comédia", tipoId: "longa-metragem" },
        { nome: "Drama", tipoId: "longa-metragem" },
        { nome: "Terror", tipoId: "longa-metragem" },
        { nome: "Ficção Científica", tipoId: "longa-metragem" },
        { nome: "Suspense", tipoId: "longa-metragem" },
        { nome: "Romance", tipoId: "longa-metragem" },
        { nome: "Aventura", tipoId: "longa-metragem" },

        // Curta-metragem
        { nome: "Experimental", tipoId: "curta-metragem" },
        { nome: "Drama", tipoId: "curta-metragem" },
        { nome: "Animação", tipoId: "curta-metragem" },
        { nome: "Social", tipoId: "curta-metragem" },

        // Vlog
        { nome: "Dia a Dia", tipoId: "vlog" },
        { nome: "Estudo", tipoId: "vlog" },
        { nome: "Fitness", tipoId: "vlog" },
        { nome: "Rotina", tipoId: "vlog" },

        // Anime
        { nome: "Shounen", tipoId: "anime" },
        { nome: "Shoujo", tipoId: "anime" },
        { nome: "Seinen", tipoId: "anime" },
        { nome: "Isekai", tipoId: "anime" },
        { nome: "Fantasia", tipoId: "anime" },

        // Série
        { nome: "Drama", tipoId: "serie" },
        { nome: "Comédia", tipoId: "serie" },
        { nome: "Suspense", tipoId: "serie" },
        { nome: "Policial", tipoId: "serie" },
        { nome: "Fantasia", tipoId: "serie" },

        // Gameplay
        { nome: "FPS", tipoId: "gameplay" },
        { nome: "RPG", tipoId: "gameplay" },
        { nome: "MOBA", tipoId: "gameplay" },
        { nome: "Simulação", tipoId: "gameplay" },
        { nome: "Terror", tipoId: "gameplay" },
        { nome: "Aventura", tipoId: "gameplay" },
        { nome: "Plataforma", tipoId: "gameplay" },
        { nome: "Corrida", tipoId: "gameplay" },
        { nome: "Esportes", tipoId: "gameplay" },
        { nome: "Battle Royale", tipoId: "gameplay" },
        { nome: "Survival", tipoId: "gameplay" },
        { nome: "Stealth", tipoId: "gameplay" },
        { nome: "Sandbox", tipoId: "gameplay" },
        { nome: "Hack and Slash", tipoId: "gameplay" },
        { nome: "Point and Click", tipoId: "gameplay" },
        { nome: "Puzzle", tipoId: "gameplay" },
        { nome: "Metroidvania", tipoId: "gameplay" },
        { nome: "Idle / Incremental", tipoId: "gameplay" },
        { nome: "Shoot 'em up", tipoId: "gameplay" },
        { nome: "Fighting", tipoId: "gameplay" },
        { nome: "Roguelike", tipoId: "gameplay" },
        { nome: "Tycoon / Gestão", tipoId: "gameplay" },
        { nome: "Visual Novel", tipoId: "gameplay" },

        // Tutorial
        { nome: "Tecnologia", tipoId: "tutorial" },
        { nome: "Culinária", tipoId: "tutorial" },
        { nome: "Artesanato", tipoId: "tutorial" },
        { nome: "Beleza", tipoId: "tutorial" },

        // Review
        { nome: "Produtos", tipoId: "review" },
        { nome: "Filmes", tipoId: "review" },
        { nome: "Jogos", tipoId: "review" },

        // Reação
        { nome: "Música", tipoId: "reacao" },
        { nome: "Vídeos virais", tipoId: "reacao" },

        // Podcast
        { nome: "Entrevista", tipoId: "podcast" },
        { nome: "Opinião", tipoId: "podcast" },
        { nome: "Cultura pop", tipoId: "podcast" },

        // Entrevista
        { nome: "Profissionais", tipoId: "entrevista" },
        { nome: "Público", tipoId: "entrevista" },

        // Comédia
        { nome: "Stand-up", tipoId: "comedia" },
        { nome: "Sketche", tipoId: "comedia" },

        // Notícia
        { nome: "Atualidades", tipoId: "noticia" },
        { nome: "Tecnologia", tipoId: "noticia" },

        // Educacional
        { nome: "Matemática", tipoId: "educacional" },
        { nome: "História", tipoId: "educacional" },
        { nome: "Ciências", tipoId: "educacional" },

        // Ao vivo
        { nome: "Gameplay", tipoId: "ao vivo" },
        { nome: "Bate-papo", tipoId: "ao vivo" },

        // Cobertura de evento
        { nome: "Show", tipoId: "cobertura de evento" },
        { nome: "Feira", tipoId: "cobertura de evento" },
        { nome: "Lançamento", tipoId: "cobertura de evento" },

        // Animação
        { nome: "Curta", tipoId: "animacao" },
        { nome: "3D", tipoId: "animacao" },
        { nome: "2D", tipoId: "animacao" },

        // Experiência social
        { nome: "Interações", tipoId: "experiencia social" },
        { nome: "Psicológicas", tipoId: "experiencia social" },

        // Unboxing
        { nome: "Tecnologia", tipoId: "unboxing" },
        { nome: "Brinquedos", tipoId: "unboxing" },

        // Viagem
        { nome: "Internacional", tipoId: "viagem" },
        { nome: "Nacional", tipoId: "viagem" },

        // Lifestyle
        { nome: "Beleza", tipoId: "lifestyle" },
        { nome: "Rotina", tipoId: "lifestyle" },

        // Motivacional
        { nome: "Desenvolvimento pessoal", tipoId: "motivacional" },
        { nome: "Autoajuda", tipoId: "motivacional" },

        // Paródia
        { nome: "Música", tipoId: "parodia" },
        { nome: "Filmes", tipoId: "parodia" }
      ],
      duration: ''
    }
  },
  mounted() { 
    UserService.perfil()
      .then(response => {
        this.data.user = response.usuario;
        // console.log('user: ', this.data.user);
        this.data.user.tipo = response.usuario.tipo
        this.user.usuario_id = response.usuario.usuario_id;
        
      })
      .catch((e) => {
          console.log(e);
          
      });
  },
  computed: {
    token() {
      //console.log(TokenService.getToken());
      
      return TokenService.getToken();
    },
     generosFiltrados() {
      return this.generos.filter(g => g.tipoId === this.video.tipo);
    }
  },

  methods: {
     closeDialog() {
      this.isDialogOpen = false;
    },

     handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        this.video.imagem = files[0];
      }
    },
    validarCampos() {
     

      if (!this.video.nome) this.erros.nome = 'Nome é obrigatório'
      if (!this.video.descricao) this.erros.descricao = 'Descrição é obrigatória'
      if (!this.video.tipo) this.erros.tipo = 'Tipo é obrigatório'
      if (!this.video.genero) this.erros.genero = 'Gênero é obrigatório'
      if (!this.video.duracao) {
        this.erros.duracao = 'Duração é obrigatória'
      }

      if (!this.video.link) {
        this.erros.link = 'Link do vídeo é obrigatório'
      } else {
        const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/
        if (!urlRegex.test(this.video.link)) {
          this.erros.link = 'Formato de link inválido'
        }
      }

      const errosAtivos = Object.values(this.erros).filter(erro => erro !== '')
      if (errosAtivos.length > 0) {
        const mensagens = errosAtivos.join(', ')
        return false
      }

      return true
    },


    async criarVideo() {
      if (!this.validarCampos()) return


      const formData = new FormData();
      formData.append('usuario_id', this.user.usuario_id);
      formData.append('nome', this.video.nome);
      formData.append('descricao', this.video.descricao);
      formData.append('tipo', this.video.tipo);
      formData.append('genero', this.video.genero);
      formData.append('duracao', this.video.duracao);
      formData.append('link', this.video.link);
      formData.append('imagem', this.video.imagem as File);
      formData.append('tags', this.video.tags.join(','));

      try {
        const response = await axios.post('http://localhost:8000/videos/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
       console.log(formData);
      this.closeDialog() 
       return response
       
      } catch (error) {
        console.log(error, this.video);
        
      } finally {
        this.enviando = false;
      }
    },
    
     formatDuration(event) {
      let value = event.target.value.replace(/\D/g, '')
      let hours = '', minutes = '', seconds = ''

      if (value.length > 0) {
        if (value.length <= 2) {
          seconds = value
        } else if (value.length <= 4) {
          minutes = value.slice(0, -2)
          seconds = value.slice(-2)
        } else {
          hours = value.slice(0, -4)
          minutes = value.slice(-4, -2)
          seconds = value.slice(-2)
        }

        const formatted =
          (hours ? `${parseInt(hours)}h ` : '') +
          (minutes ? `${parseInt(minutes)}m ` : '') +
          (seconds ? `${parseInt(seconds)}s` : '')

        this.video.duracao = formatted.trim()
      } else {
       this.video.duracao = ''
      }
    },
  }
  
}

</script>

<template>
  <SidebarProvider class="">
   
    <AppSidebarADM v-if="data.user.tipo == 'administrador'"/>
    <AppSidebar v-else/>
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
              <AlertDialog  v-model:open="isDialogOpen">
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
                  <div class="flex justify-center">
    
                    <form @submit.prevent="criarVideo" class="w-full">
                      <div class="flex gap-6">
                        <div class="w-[50%]">
                          <Label class="ml-2">Título</Label>
                          <Input v-model="video.nome" placeholder="Título" class="ml-2 mb-1" />
                          <p v-if="erros.nome" class="text-red-500 text-sm pl-3 pt-1">{{ erros.nome }}</p>
                          <Label class="ml-2 ">Descrição</Label>
                          <textarea v-model="video.descricao" placeholder="Descrição" class="mx-2 mb-3 h-32 p-3 w-full border rounded text-sm"></textarea>

                          <div class="flex justify-between mx-2 mb-4 w-[100%]">
                            
                            <div>
                              <Label class="ml-2 ">Tipo do Video</Label>
                              <Select v-model="video.tipo">
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Tipos</SelectLabel>
                                    <SelectItem
                                      v-for="tipo in tipos"
                                      :key="tipo.id"
                                      :value="tipo.id"
                                    >
                                      {{ tipo.nome }}
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <p v-if="erros.tipo" class="text-red-500 text-sm pl-3 pt-1">{{ erros.tipo }}</p>
                            </div>

                            <div>
                              <Label class="ml-2 ">Gênero do Video</Label>
                              <Select v-model="video.genero" :disabled="!video.tipo">
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o gênero" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Gêneros</SelectLabel>
                                    <SelectItem
                                      v-for="genero in generosFiltrados"
                                      :key="genero.nome"
                                      :value="genero.nome"
                                    >
                                      {{ genero.nome }}
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <p v-if="erros.genero" class="text-red-500 text-sm pl-3 pt-1">{{ erros.genero }}</p>
                            </div>
                          

                          

                          </div>
                          <Label class="ml-2 ">Tags do Video</Label>
                          <TagsInput v-model="video.tags" class="mb-4 ml-2">
                            <TagsInputItem v-for="item in video.tags" :key="item" :value="item">
                              <TagsInputItemText />
                              <TagsInputItemDelete />
                            </TagsInputItem>
                            <TagsInputInput placeholder="Digite as tags..." />
                          </TagsInput>
                          

                          <Label class="ml-2 ">Duração do Video com segundos</Label>
                          <Input v-model="video.duracao" placeholder="Duração com segundos" class="mb-4 mx-2" @input="formatDuration" />
                          <p v-if="erros.duracao" class="text-red-500 text-sm pl-3 pt-1">{{ erros.duracao }}</p>

                          <Label class="ml-2 ">Link do Video (Youtube)</Label>
                          <Input v-model="video.link" placeholder="Link" class="m-2" />
                          <p v-if="erros.link" class="text-red-500 text-sm pl-3 pt-1">{{ erros.link }}</p>
                        </div>

                        <label for="imagem" class="w-full h-90 flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer text-gray-500 border-[#7E57C2]">
                          <CloudUpload :size="100" />
                          <span>Clique para enviar a imagem miniatura</span>
                          <input type="file" 
                          @change="(e: any) => video.imagem = e.target.files[0]" required />
                        </label>
                      </div>

                      <div class="w-full flex justify-between mt-16 mx-2">
                         <AlertDialogCancel class="">
                           <Button class=" bg-black hover:bg-[#513188] w-full" style="border-radius: 30px;">Cancelar</Button>
                         </AlertDialogCancel>
                      
                        <Button class="w-[20%] bg-[#7E57C2] hover:bg-[#513188]" style="border-radius: 30px;" type="submit">Adicionar</Button>
                      </div>
                    </form>
                  </div>
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
