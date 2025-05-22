
<script lang="ts">
  import axios from 'axios';
  import { Button } from '@/components/ui/button'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs' 
import Label from '@/components/ui/label/Label.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { defineComponent } from 'vue';
import { SquarePenIcon, Trash, Trash2, LucideEdit, ListVideo, EllipsisVertical, Play, PlusCircle, Eye, CircleX, Pen } from 'lucide-vue-next';
import { UserService } from '@/services/user.service';
import Separator from '@/components/ui/separator/Separator.vue';
import { VideoService } from '@/services/video.service';
import router from '@/routes';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { PlaylistService } from '@/services/playlist.service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  
interface Video {
  id: number;
  usuario_id: number;
  nome: string;
  visualizacoes: number;
  imagem: string | null;
  tags: []
  nome_usuario: string,
  duracao: string,
}

  export default defineComponent({
    components:{
      Tabs,
      TabsContent,
      TabsList,
      TabsTrigger,
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Input,
      Label,
      SquarePenIcon,
      Trash2,
      ListVideo,
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectTrigger,
      SelectValue,
      Button,
      Separator,
      LucideEdit,
      Avatar,
      AvatarFallback,
      AvatarImage,
      EllipsisVertical,
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuPortal,
      DropdownMenuSeparator,
      DropdownMenuShortcut,
      DropdownMenuSub,
      DropdownMenuSubContent,
      DropdownMenuSubTrigger,
      DropdownMenuTrigger,
      PlusCircle,
      Eye,
      CircleX,
      Pen,
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    },
    data() {
      return {
        userIdPerfil: 0,
        genero: {
          
        },
        defaultImg: '/img/default-user.jpg',
        seguindo: false,
        videos: [] as Video[],
        id: 0,
        playlist: {
          usuario_id: '',
          titulo: '',
          imagem: null as File | null,
        },
      };
    },
    async mounted() { 
       this.id = Number(this.$route.params.id);
        this.loadPlaylist(this.id);
        this.videos = await this.getVideosByPlaylistId(this.videos)

        
    },
    methods: {
      async loadPlaylist(id:number) {
        try {
            const response = await PlaylistService.obterPlaylistPorId(id) 
             this.playlist = {
              usuario_id: response.playlist.playlist.usuario_id,
              titulo: response.playlist.playlist.titulo,
              imagem: response.playlist.playlist.imagem, 
             }
          console.log(response);
          
        } catch (error) {
        console.error('Erro ao pegar informacoes do usuario:', error);
      }
      },

      async getVideosByPlaylistId(items:any) {
        try {
        
            const response = await PlaylistService.listarVideosDaPlaylist(this.id)
            console.log(response);
            
            items = await response.data.map((item:any) => ({
                    video_id: item.id,
                    nome: item.nome,
                    visualizacoes: item.visualizacoes,
                    imagem: item.imagem,
                    status: item.status,
                    duracao: item.duracao,
                    criado_em: item.criado_em,
                    atualizado_em: item.atualizado_em
            }))
            
            return items;
        
        } catch (error) {
          console.error('Erro ao buscar vídeos:', error);
        }
      },

      async goToPageVideWithId(id:number) {
        router.push({ name: 'Video.Visualizar', params: { id } })
      },

      async inativarPlaylist() {
       PlaylistService.inativarPlaylist(Number(this.id))
       .then((response) => {
        router.push({ name: 'Home'})
        return response;
       })
       .catch((error) => console.log(error))
       
      },

      async goToEditarPlaylist() {
        const id = this.id
        router.push({ name: 'Playlist.Editar', params: {id} })
      }
    
    }
  });
  </script>

<template>
  <div class="grid grid-cols-4 h-[90vh]">
        <div class="p-3 h-full">
            <div class="bg-gray-300/25 h-full rounded-[20px] p-4">
                <div class="">
                   <div >
                      <img
                        v-if="playlist.imagem"
                        :src="`http://localhost:8000/uploads/${playlist.imagem}`"
                        alt="Thumbnail"
                        class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <p class="py-3 text-xl">{{ playlist.titulo }}</p>
                      <p class="text-[10px]"> 0 Videos</p>
                    </div>
                    <div class="py-2 flex">
                      <div @click="inativarPlaylist" class="border rounded-full p-2 mx-1" style="cursor: pointer;">
                         <CircleX/>
                      </div>
                      <div class="border rounded-full p-2 mx-1" style="cursor: pointer;">
                        <Pen/>
                          <AlertDialog >
                              <AlertDialogTrigger as-child>
                              
                                  <div class="flex flex-col items-center"  style="cursor: pointer;">
                                    <CirclePlus/>
                                    <p> Adicionar à Playlist</p>

                                  </div>
                                
                          
                              </AlertDialogTrigger>

                              <AlertDialogContent class="w-[430px]"  >
                                <div >

                                  <AlertDialogHeader class="pb-2">
                                    <AlertDialogTitle>Salvar em</AlertDialogTitle>
                                  </AlertDialogHeader>

                                  <Separator orientation="horizontal"/>

                                <div class="space-y-2 my-5">
                                    <div
                                      v-for="(playlist, index) in playlistList"
                                      :key="index"
                                      class="flex items-center space-x-2"
                                    >
                                    <Checkbox
                                      :id="`playlist-${index}`"
                                      :modelValue="selectedPlaylistId === playlist.id"
                                      @update:modelValue="(val) => selectedPlaylistId = val ? playlist.id : null"
                                    />

                                      <label
                                        :for="`playlist-${index}`"
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {{ playlist.titulo }}
                                      </label>
                                    </div>
                                  </div>

                                  <div class="flex mt-3">
                                        <Button class="mr-2" @click="closeDialog">Cancelar</Button>
                                        <Button  @click="addVideoNaPlaylist">Adicionar a playlist</Button>
                                    </div>

                                  <Separator orientation="horizontal"/>
                                  
                                  <AlertDialogFooter>
                                  
                                    <div>
                                          <Button variant="ghost" @click="openCriar">Criar nova playlist</Button>

                                    </div>
                                      
                                  </AlertDialogFooter>

                                </div>
                              </AlertDialogContent>

                              

                            </AlertDialog>
                      </div>
                      
                    </div>
                </div>
            </div>
        </div>
        <div class=" col-span-3 px-2 pt-4">
          <div class="">
            <div>
              ordenar
            </div>
            <div
              v-for="video in videos"
              :key="video.id"
              class="flex" 
              style="cursor: pointer;"
             
            >
            <div class="grid grid-cols-4 h-full">
              <div class="col-span-3 flex bg-red-300 grid grid-cols-6 gap-2"  @click="goToPageVideWithId(video.id)">

                <div class=" flex bg-blue-300">
                  <img
                    v-if="video.imagem"
                    :src="`http://localhost:8000/uploads/${video.imagem}`"
                    alt="Thumbnail"
                    class="mt-2 object-cover rounded-xl"
                    style="object-fit: fill; height: 90px; width: 150px;"
                  />
                  <div class="w-full text-right pr-1 mb-3 mt-[-14%]">
                    <p class=" text-white inline text-[14px] p-[2px] rounded-[3px]">{{ video.duracao }}</p>
                  </div>
                 
                </div>
                <div class="flex w-full mt-3 mx-3 flex-col col-span-5 bg-red-300">
                  
                  <div class="w-full ">
                    <h3 class="font-bold text-base">{{ video.nome }}</h3>
                  </div>
                  <div class="">
                    <p class="text-gray-500 text-[15px]">{{ video.visualizacoes }} vizualizacoes</p>
                  </div>
                </div>

                 <div>
                </div>
              </div>
              <div class="py-2 flex">
                    <DropdownMenu>
                       <DropdownMenuTrigger as-child class="flex items-center justify-center bg-green-300">
                        <div class="rounded-full border bg-gray-200 flex items-center inline h-[30px] w-[30px] justify-center" style="cursor: pointer;">
                           <EllipsisVertical class=""/>
                         </div>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent class="w-56">   
                         <DropdownMenuGroup style="cursor: pointer;">
                           <!-- <DropdownMenuItem>
                             <Eye/>
                             <span>Exibir videos indisponiveis</span>
                           </DropdownMenuItem> -->
                           <DropdownMenuItem>
                             <CircleX/>
                             <span>Inativar Video</span>
                           </DropdownMenuItem>
                         </DropdownMenuGroup>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   
              </div>
            </div>

             

            </div>

          </div>
          
        </div>
  </div>
  
</template>
  
























































