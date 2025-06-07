
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
import rio from '@/assets/imagens/rio.jpg'
import { SquarePenIcon, Trash, Trash2, LucideEdit, ListVideo } from 'lucide-vue-next';
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
import { SeguidoresService } from '@/services/seguidores.service';
 import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import EstatisticaService from '@/services/estatistica.service';

interface Video {
  id: number;
  usuario_id: number;
  nome: string;
  visualizacoes: number;
  imagem: string | null;
  tags: []
  nome_usuario: string
}


interface Playlist {
    playlist_id: number,
    titulo: string,
    imagem: string,
    status: string
}

interface Seguidores {
  usuario_id: number,
  foto_perfil: string,
  nome_completo: string,
  username: string
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
      rio,
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
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    },
    data() {
      return {
        userIdPerfil: 0,
        usuario: {
          usuario_id: 0,
          nome_completo: '',
          username: '',
          email: '',
          senha: '',
          data_nascimento: '',
          foto_perfil: null as File | null,
          genero: '',
          biografia: '',
        },
        genero: {
          
        },
        rio,
        defaultImg: '/img/default-user.jpg',
        seguindo: false,
        videos: [] as Video[],
        playlists: [] as Playlist[],
        id: 0,
        editar: false,
        seguidores: [] as Seguidores[],
        estatisticas: {
            total_videos: 0,
            total_seguidores: 0,
            total_seguidos: 0
        },

      };
    },
    async mounted() { 
     
        try {
            const id = parseInt(this.$route.params.id as string);
            this.id = id;
            
           
            const item = await UserService.perfil();
            //   this.id = item.usuario.usuario_id;
            this.usuario = {
                usuario_id: item.usuario.usuario_id,
                nome_completo: item.usuario.nome_completo,
                username: item.usuario.username,
                foto_perfil: item.usuario.foto_perfil,
                email: item.usuario.email,
                senha: item.usuario.senha,
                data_nascimento: item.usuario.data_nascimento,
                genero: item.usuario.genero,
                biografia: item.usuario.biografia
            };
            this.videos = await this.getVideosById(this.usuario.usuario_id);
            
            const item_estatistica = await EstatisticaService.estatisticasPorUsuario(this.usuario.usuario_id)
            

            this.estatisticas = {
                total_videos: item_estatistica.estatisticas.total_videos,
                total_seguidores: item_estatistica.estatisticas.total_seguidores,
                total_seguidos: item_estatistica.estatisticas.total_seguidos
            }
            
            this.ButtonEditar()
            this.playlists = await this.loadPlaylist(this.playlists)

        } catch (e) {
            console.log('Erro ao buscar perfil:', e);
            router.push({ name: 'Home' })
        }

        this.seguidores = await this.listarSeguidores(this.seguidores)
    },
    methods: {

      async getVideosById(id: number) {
        
        try {
          
          const response = await VideoService.listarVideosAtivosPorUsuario(id)
          const data = await response.data.map((item:any) => ({
            id: item.video_id,
            usuario_id: item.usuario_id,
            nome: item.nome,
            imagem: item.imagem,
            visualizacoes: item.visualizacoes,
            nome_usuario: item.nome_usuario,
            
          }))
          console.log('dentro dos videos', data);
            
            return data;
        
        } catch (error) {
          console.error('Erro ao buscar vídeos:', error);
        }
      },

      async goToPageVideWithId(id:number) {
        router.push({ name: 'Video.Visualizar', params: { id } })
      },

       async goToPagePlaylistWithId(id:number) {
        router.push({ name: 'Playlist.Id', params: { id } })
      },

      async goToPerfilWithId(name:string) {
          const response = UserService.getUserByName(name);
          return response; 
      },

      ButtonEditar() {
          if(this.id == this.usuario.usuario_id) {
            this.editar = true;
            console.log("true",this.editar, ' - ', ' - ', this.id, this.usuario.usuario_id);
            
          }
          else { 
            this.editar = false;
              console.log("false",this.editar, ' - ', ' - ', this.id, this.usuario.usuario_id);
           }
      },

      goTo() {
        router.push(`/editar/${this.id}`)
      },

      async loadPlaylist(items:any) {
            
            try {
                const response = await PlaylistService.listarPlaylistsPorUsuario(this.usuario.usuario_id)
                console.log(response);
                
                 items = response.data.map((item:any) => ({
                    playlist_id: item.playlist_id,
                    titulo: item.titulo,
                    imagem: item.imagem,
                    status: item.status
                }))
                console.log(items);
                
                return items;

            } catch (error) {
                console.error(error);
            }

      },

      async statusDefine(status: string) {
        if (status == "ativo") {
          return
        }
      },

      async listarSeguidores(items: any) {
        try {
          const response = await SeguidoresService.listarSeguidoresPorId(this.usuario.usuario_id);

          const seguidores = response.seguidores.map((item: any) => ({
            usuario_id: item.usuario_id,
            nome_completo: item.nome_completo,
            username: item.username,
            foto_perfil: item.foto_perfil
          }));

          this.seguindo = seguidores.some(seguidor => seguidor.usuario_id === this.id);

          console.log('Está seguindo?', this.seguindo);
          
          return seguidores;
        } catch (error) {
          console.log(error);
        }
      },

      goToPerfil(id: number) {
        router.push({ name: 'Usuario.Perfil', params: { id } }).then(() => {
            location.reload();
            })
      }

    }
  });
  </script>

<template>
  <div class="">
    <div class="bg-green-500 h-[200px]"></div>
    <div class="flex w-full items-center justify-center flex-col">

         <div class=" w-[175px] h-[180px] mt-[-7%] bg-white p-[3px] rounded-full mb-10">
            <img
              :src="`http://localhost:8000/uploads/${usuario.foto_perfil}`"
              alt="Foto de perfil"
              class="w-[175px] h-[180px] object-cover rounded-full"
            />
           
        </div> 
        <div class="flex items-center mb-10 flex-col">

          <div>
            <p class="text-2xl">{{ usuario.nome_completo }}</p>
          </div>
          <div class="w-[50vw] justify-center items-center mt-2">
            <p class="text-center text-gray-600">{{ usuario.biografia }}</p>
          </div>
        </div>

        <div>
          <div class="flex grid grid-cols-5 gap-2 items-center justify-center">
            <div class="flex flex-col items-center">
                <p class="text-3xl mb-3" v-if="estatisticas.total_videos">{{ estatisticas.total_videos }}</p>
                <p class="text-3xl mb-3" v-else>0</p>
                <p class="text-gray-600">Videos</p>
            </div>

            <Separator orientation="vertical" class="mx-10 "/>

            
             <Dialog>
                <DialogTrigger as-child>
                  <div class="flex flex-col items-center" style="cursor: pointer;">
                    <p class="text-3xl mb-3" v-if="estatisticas.total_seguidores">{{ estatisticas.total_seguidores }}</p>
                    <p class="text-3xl mb-3" v-else>0</p>
                    <p class="text-gray-600">Seguidores</p>
                  </div>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[400px] py-5">
                  <DialogHeader>
                    <DialogTitle>Seguidores</DialogTitle>
                  </DialogHeader>
                  
                  <div v-for="seguidor in seguidores" class="m-0">
                    <div class="grid grid-cols-5 gap-2 py-4 ml-[-15px]">
                      <div class="flex justify-end"  @click="goToPerfil(seguidor.usuario_id)" style="cursor: pointer;">
                         <img
                            v-if="seguidor.foto_perfil"
                            :src="`http://localhost:8000/uploads/${seguidor.foto_perfil}`"
                            alt="Thumbnail"
                            class="mt-2 h-auto w-[53px] object-cover rounded-full"
                          />
                          <Avatar v-else  class="h-auto w-[53px] flex items-center justify-center">
                              <AvatarImage src="https://github.com/unovue.png" alt="@unovue" class="" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                      </div>
                      <div class=" col-span-3 flex justify-center flex-col" @click="goToPerfil(seguidor.usuario_id)" style="cursor: pointer;">
                          <!-- <RouterLink :to="`http://localhost:5173/perfil/${seguidor.usuario_id}`">IR PRO PERFIL</RouterLink> -->
                           
                        <p class="text-[12px] font-bold">{{ seguidor.username }}</p>
                         <p>{{ seguidor.nome_completo }}</p>
                      </div>
                      <div class="flex items-center ml-[-10px]">
                        
                      </div>
                    </div>
                  </div>
                 
                </DialogContent>
              </Dialog>

            <Separator orientation="vertical" class="ml-10"/>

             <div class="flex flex-col items-center">
              <p class="text-3xl mb-3" v-if="estatisticas.total_seguidos">{{ estatisticas.total_seguidos }}</p>
                    <p class="text-3xl mb-3" v-else>0</p>
                    <p class="text-gray-600">Seguindo</p>
            </div>
          </div>
        </div>

        <div >
            <div class="flex mt-10">
              <Button class="bg-[#7E57C2]" @click="goTo()">Editar</Button>
            </div>
        </div>
       

    </div>
    <div class=" mt-10 p-5">
      <Tabs default-value="seguidores" class="w-full mt-4">
        <TabsList class="grid w-full grid-cols-3 border-none bg-transparent w-[300px]">
          <TabsTrigger value="videos" class="">
            Videos
          </TabsTrigger>
          <TabsTrigger value="playlist">
            Playlist
          </TabsTrigger>
           <TabsTrigger value="seguidores">
            Seguidores
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos" class="w-full ">
          <div class="w-full  " >

             <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
                <div
                  v-for="video in videos"
                  :key="video.id"
                  class="bg-white" 
                  style="cursor: pointer;"
                  @click="goToPageVideWithId(video.id)"
                >
                  <div>
                  
                    <img
                      v-if="video.imagem"
                      :src="`http://localhost:8000/uploads/${video.imagem}`"
                      alt="Thumbnail"
                      class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                    />
                  </div>
                  <div class="flex mt-3 gap-4 items-center">
                    <Avatar>
                      <AvatarImage :src="`http://localhost:8000/uploads/${usuario.foto_perfil}`"/>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 class="font-bold text-base">{{ video.nome }}</h3>
                      <p class="text-xs">{{ video.visualizacoes }} visualizações</p>
                    </div>
                  </div>

                </div>
              </div>
            
          </div>
          
        </TabsContent>
        <TabsContent value="playlist" class="w-full">
          <div class="w-full  " >

             <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
                <div
                  v-for="playlist in playlists"
                  :key="playlist.playlist_id"
                  class="bg-white" 
                  style="cursor: pointer;"
                  @click="goToPagePlaylistWithId(playlist.playlist_id)"
                >
                <div >

                  <div>
                    <img
                      v-if="playlist.imagem"
                      :src="`http://localhost:8000/uploads/${playlist.imagem}`"
                      alt="Thumbnail"
                      class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                    />
                  </div>
                  <div class="flex mt-3 gap-4 items-center">
                    <div>
                      <h3 class="font-bold text-base">{{ playlist.titulo }}</h3>
                      <!-- <p class="text-xs">{{ playlist.visualizacoes }} visualizações</p> -->
                    </div>
                  </div>
                </div>

                </div>
              </div>
            
          </div>
        </TabsContent>
        <TabsContent value="seguidores" class="w-full">
          <div class="w-full" >

            <Tabs default-value="seguidores" class="w-full mt-4">
              <TabsList class="grid w-full grid-cols-1 border-none bg-transparent w-[100px]">
                <TabsTrigger value="seguidores" class="">
                  Seguidores
                </TabsTrigger>
                <TabsTrigger value="seguindo">
                  Seguindo
                </TabsTrigger>
              </TabsList>
              <TabsContent value="seguidores" class="w-full ml-[100px] ">
                <div class="w-full  " >

                  <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
                      <div
                        v-for="video in videos"
                        :key="video.id"
                        class="bg-white" 
                        style="cursor: pointer;"
                        @click="goToPageVideWithId(video.id)"
                      >
                        <div>
                        
                          <img
                            v-if="video.imagem"
                            :src="`http://localhost:8000/uploads/${video.imagem}`"
                            alt="Thumbnail"
                            class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                          />
                        </div>
                        <div class="flex mt-3 gap-4 items-center">
                          <Avatar>
                            <AvatarImage :src="`http://localhost:8000/uploads/${usuario.foto_perfil}`"/>
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 class="font-bold text-base">{{ video.nome }}</h3>
                            <p class="text-xs">{{ video.visualizacoes }} visualizações</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  
                </div>
                
              </TabsContent>
              <TabsContent value="seguindo" class="w-full">
                <div class="w-full" >

                  <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
                      <div
                        v-for="playlist in playlists"
                        :key="playlist.playlist_id"
                        class="bg-white" 
                        style="cursor: pointer;"
                        @click="goToPagePlaylistWithId(playlist.playlist_id)"
                      >
                      <div v-if="playlist.status == 'ativo'">

                        <div>
                          <img
                            v-if="playlist.imagem"
                            :src="`http://localhost:8000/uploads/${playlist.imagem}`"
                            alt="Thumbnail"
                            class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                          />
                        </div>
                        <div class="flex mt-3 gap-4 items-center">
                          <div>
                            <h3 class="font-bold text-base">{{ playlist.titulo }}</h3>
                            <!-- <p class="text-xs">{{ playlist.visualizacoes }} visualizações</p> -->
                          </div>
                        </div>
                      </div>

                      </div>
                    </div>
                  
                </div>
              </TabsContent>
            </Tabs>
            
          </div>
        </TabsContent>
      </Tabs>
      
  </div>
    
  </div>
  
</template>
  
























































