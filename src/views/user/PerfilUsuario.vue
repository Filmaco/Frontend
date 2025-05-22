
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
      };
    },
    async mounted() { 
     
        // pegar o id da rota e id pelo token
        try {
          const id = parseInt(this.$route.params.id as string);
          this.id = id;
          
          const response = await UserService.getUserById(Number(this.id));
          this.usuario = response;
          this.videos = await this.getVideosById(this.id);

          const item = await UserService.perfil();
          this.userIdPerfil = item.usuario.usuario_id
          console.log(item);
          
          
          this.ButtonEditar()
          this.playlists = await this.loadPlaylist(this.playlists)

        } catch (e) {
          console.log('Erro ao buscar perfil:', e);
          router.push({ name: 'Home' })
        }

        
    },
    methods: {
      async loadUser(item:number) {
        try {
           
            return item;

        } catch (error) {
        console.error('Erro ao pegar informacoes do usuario:', error);
      }
      },

      handleFollow() {
        this.seguindo = !this.seguindo;
      },
      async getVideosById(id: number) {
        try {
        
            const response = await VideoService.listarVideosPorUsuario(id)
            const data = await response.data.map((item:any) => ({
                id: item.video_id,
                usuario_id: item.usuario_id,
                nome: item.nome,
                imagem: item.imagem,
                visualizacoes: item.visualizacoes,
                nome_usuario: item.nome_usuario,
              
        }))
            
            return data;
        
        } catch (error) {
          console.error('Erro ao buscar vídeos:', error);
        }
      },

      async goToPageVideWithId(id:number) {
        router.push({ name: 'Playlist.Id', params: { id } })
      },

      async goToPerfilWithId(name:string) {
          const response = UserService.getUserByName(name);
          return response;
        
      },

      ButtonEditar() {
          if(this.userIdPerfil == this.usuario.usuario_id) {
            this.editar = true;
            console.log("true",this.editar, ' - ', ' - ', this.userIdPerfil, this.usuario.usuario_id);
            
          }
          else { 
            this.editar = false;
              console.log("false",this.editar, ' - ', ' - ', this.userIdPerfil, this.usuario.usuario_id);
           }
      },

      goTo() {
        router.push(`/editar/${this.userIdPerfil}`)
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
          <div class="w-[30vw] justify-center items-center mt-2">
            <p class="text-center text-gray-600">{{ usuario.biografia }}</p>
          </div>
        </div>

        <div>
          <div class="flex grid grid-cols-5 gap-2 items-center justify-center">
            <div class="flex flex-col items-center">
              <p class="text-3xl mb-3">45</p>
              <p class="text-gray-600">Videos</p>
            </div>

            <Separator orientation="vertical" class="mx-10 "/>

             <div class="flex flex-col items-center">
              <p class="text-3xl mb-3">45</p>
              <p class="text-gray-600">Seguidores</p>
            </div>

            <Separator orientation="vertical" class="ml-10"/>

             <div class="flex flex-col items-center">
              <p class="text-3xl mb-3">45</p>
              <p class="text-gray-600">Seguindo</p>
            </div>
          </div>
        </div>

        <div v-if="editar">
            <div class="flex mt-10">
              <Button class="bg-[#7E57C2]" @click="goTo()">Editar</Button>
            </div>
        </div>
        <div v-else>
           <div v-if="seguindo" class="flex mt-10">
              <Button class="bg-[#7E57C2]" @click="handleFollow()">Seguir</Button>
            </div>
            
            <div v-else class="flex mt-10">
                <Button class="bg-[#5A3A93]" @click="handleFollow()">Seguindo</Button>
            </div>
        </div>
       

    </div>
 
    <div class=" mt-10 p-5">
      <Tabs default-value="videos" class="w-full mt-4">
        <TabsList class="grid w-full grid-cols-2 border-none bg-transparent w-[200px]">
          <TabsTrigger value="videos" class="">
            Videos
          </TabsTrigger>
          <TabsTrigger value="playlist">
            Playlist
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
                  @click="goToPageVideWithId(playlist.playlist_id)"
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
    
  </div>
  
</template>
  
























































