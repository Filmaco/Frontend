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
import { 
  TagsInput,
  TagsInputInput, 
  TagsInputItem, 
  TagsInputItemDelete, 
  TagsInputItemText 
} from '@/components/ui/tags-input'


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
    TagsInput,
    TagsInputInput, 
    TagsInputItem, 
    TagsInputItemDelete, 
    TagsInputItemText
  },
  data() {
    return {
      showTooltip: false,
      mensagemTooltip: '',
      data: {
        user: {
          id: 0,
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
          { nome: "Documentário", id: "documentario" },
          { nome: "Música", id: "clipe musical" },
          { nome: "Filme", id: "longa-metragem" },
          { nome: "Curta-metragem", id: "curta-metragem" },
          { nome: "Série", id: "serie" },
          { nome: "Animação", id: "animacao" },

        ],
        generos: [
          { nome: "Natureza", tipoId: "documentario" },
          { nome: "História", tipoId: "documentario" },
          { nome: "Biografia", tipoId: "documentario" },
          { nome: "Científico", tipoId: "documentario" },
          { nome: "Investigativo", tipoId: "documentario" },
          { nome: "Cultural", tipoId: "documentario" },

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

          // Série
          { nome: "Drama", tipoId: "serie" },
          { nome: "Comédia", tipoId: "serie" },
          { nome: "Suspense", tipoId: "serie" },
          { nome: "Policial", tipoId: "serie" },
          { nome: "Fantasia", tipoId: "serie" },

          // Animação
          { nome: "Curta", tipoId: "animacao" },
          { nome: "3D", tipoId: "animacao" },
          { nome: "2D", tipoId: "animacao" },

      ],
      duration: '',
      error:{
        error:false,
        message: ''
      }
    }
  },
  mounted() { 
    UserService.perfil()
      .then(response => {
        this.data.user = {
          id: response.usuario.usuario_id, 
          nome_completo: response.usuario.nome_completo,
          email: response.usuario.email,
          avatar: response.usuario.foto_perfil,
          tipo: response.usuario.tipo
        } ;
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

    async validarImagem(): Promise<boolean> {
        const imagem = this.video.imagem as File;

        if (!imagem) {
          this.exibirTooltip("Imagem não selecionada.")
          this.error.error = true 
          this.error.message = 'Tamanho de arquivo não suportado'
          return false;
        }

        // Máximo de 2MB
        const tamanhoMaximo = 2 * 1024 * 1024;
        if (imagem.size > tamanhoMaximo) {
          this.exibirTooltip("A imagem deve ter no máximo 2MB.");
          return false;
        }

        // Verificar dimensões e proporção
        const dimensoesOk = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const largura = img.width;
            const altura = img.height;
            const proporcao = largura / altura;

            const proporcaoIdeal = 16 / 9;
            const margemErro = 0.05; // Aceita pequena variação

            const proporcaoOk = Math.abs(proporcao - proporcaoIdeal) < margemErro;
            const tamanhoOk = largura >= 640 && largura <= 1920 && altura >= 360 && altura <= 1080;

            if (proporcaoOk && tamanhoOk) {
              resolve(true);
            } else {
              this.exibirTooltip(`A imagem deve ter proporção 16:9 e dimensões entre 640x360 e 1920x1080.\nTamanho atual: ${largura}x${altura}`);
              resolve(false);
            }
          };
          img.onerror = () => {
            this.exibirTooltip("Erro ao carregar imagem.");
            resolve(false);
          };

          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              img.src = e.target.result.toString();
            } else {
              resolve(false);
            }
          };
          reader.readAsDataURL(imagem);
        });

        return dimensoesOk;
      },

      async criarVideo() {
        if (!this.validarCampos()) return

        const imagemValida = await this.validarImagem();
        if (!imagemValida) {
          this.exibirTooltip('Imagem invalida')
          return
        }

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

      exibirTooltip(texto, duracao = 3000) {
        this.mensagemTooltip = texto
        this.showTooltip = true
        setTimeout(() => {
          this.showTooltip = false
        }, duracao)
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
                        <div class="w-[80%]">
                          <Label class="ml-2">Título</Label>
                          <Input v-model="video.nome" placeholder="Título" class="ml-2 mb-1" />
                          <p v-if="erros.nome" class="text-red-500 text-sm pl-3 pt-1">{{ erros.nome }}</p>
                          <Label class="ml-2 ">Descrição</Label>
                          <textarea v-model="video.descricao" placeholder="Descrição" class="mx-2 mb-3 h-32 p-3 w-full border rounded text-sm"></textarea>

                          <div class="flex justify-between mx-2 mb-4 w-[100%]">
                            
                            <div>
                              <Label class="ml-2 ">Tipo do Video</Label>
                              <Select v-model="video.tipo">
                                <SelectTrigger class="w-[170px]">
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger class="w-full">
                                <SelectContent class="w-full">
                                  <SelectGroup class="w-full">
                                    <SelectLabel>Tipos</SelectLabel>
                                    <SelectItem
                                      v-for="tipo in tipos"
                                      :key="tipo.id"
                                      :value="tipo.id"
                                      class="w-full"
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
                              <Select v-model="video.genero" :disabled="!video.tipo" class="">
                                <SelectTrigger class="w-[170px]">
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
                      <div v-if="error.error" class="ml-3 text-red-500">{{ error.message }}</div>
                      <div class="w-full flex justify-between mt-16 mx-2">
                         <AlertDialogCancel class=" bg-black hover:bg-[#513188] w-[20%]" style="border-radius: 30px;">
                           <Button class="w-full h-full">Cancelar</Button>
                         </AlertDialogCancel>
                      
                        <Button class="w-[20%] bg-[#7E57C2] hover:bg-[#513188]" style="border-radius: 30px;" type="submit">Adicionar</Button>
                      </div>
                    </form>
                  </div>
                </AlertDialogContent>
              </AlertDialog>

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
  <div class="relative inline-block">
    <div
     
      class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm px-3 py-1 rounded shadow z-10 transition-opacity duration-300"
    >
      {{ mensagemTooltip }}
    </div>
  </div>
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
