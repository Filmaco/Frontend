<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue';
import { CirclePlus, Share2, CircleEllipsis, Frown, Smile, Laugh, ThumbsDown, ThumbsUp, Heart  } from 'lucide-vue-next';
import router from '@/routes';
import CriarPlaylist from '@/views/playlist/CriarPlaylist.vue'
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
import NavUser from "@/components/NavUser.vue";
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
import { PlaylistService } from '@/services/playlist.service';
import { UserService } from '@/services/user.service';
import { Checkbox } from '@/components/ui/checkbox'
import { onMounted, ref } from 'vue';
import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { CloudUpload, User } from 'lucide-vue-next';

FilePond.registerPlugin(FilePondPluginImagePreview);


interface Playlist {
  id: number,
  titulo: string,
}

export default defineComponent({
  name: 'VideoPlayer',
  components: {
    CloudUpload,
    Avatar, 
    AvatarFallback, 
    AvatarImage,
    Button,
    CirclePlus,
    Share2,
    CircleEllipsis,
    Frown,
    Smile,
    Laugh,
    ThumbsDown,
    ThumbsUp,
    Heart,
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
    Separator,
    NavUser,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch,
    CriarPlaylist,
    Checkbox,
  },
  data() {
    return {
      isDialogOpen: false,
      teste: true,
      step: 'selecionar',
      playlistList: [] as Playlist[],
      id: 0,
      idPlaylist: 0,
      data: {
        video: {
          video_id: 0,
          nome: '',
          descricao: '',
          genero: '',
          duracao: '',
          visualizacoes: 0,
          tipo: '',
          link: '',
          imagem: '',
          nome_usuario: ''
        },
        usuarioId: '',
        playlist: {
          usuario_id: '',
          titulo: '',
          imagem: null as File | null,
        },
        playlistVideo: {
           playlist_id: '',
           video_id: ''
        }
      },
      criar: true,
      relatedVideos: [] as any[],
      activeIcon: null as null | 'like' | 'dislike' | 'love',
      selectedPlaylistId:  null as (number | null),
    };
  },

  async mounted() {
    this.id = Number(this.$route.params.id);
    this.handleVideo(this.id);

   
    UserService.perfil()
    .then(async user => {
     
      
      this.data.playlist.usuario_id = user.usuario.usuario_id;
      //console.log('user: ',  this.data.playlist.usuario_id);
      
      this.playlistList = await this.listarPlaylist(this.playlistList )

    })
    .catch((e) => {
        console.log(e);
        
    });

    console.log();
    
  },

  setup() {
    const pondRef = ref<HTMLInputElement | null>(null);
    let filepondInstance: any = null;

    onMounted(() => {
      if (pondRef.value) {
        filepondInstance = FilePond.create(pondRef.value, {
          allowMultiple: false,
          labelIdle: 'Arraste a imagem ou <span class="filepond--label-action">clique aqui</span>',
          maxFiles: 1,
        });
      }
    });

    return {
      pondRef,
      getFilepondFile: () => filepondInstance?.getFiles?.()[0]?.file || null
    };
  },
  methods: {
    async handleVideo(id: number) {
      try {
        const response = await axios.get(`http://localhost:8000/videos/${id}`);
        //console.log(response.data);

        this.data.video = {
          video_id: response.data.data.video_id,
          nome: response.data.data.nome,
          descricao: response.data.data.descricao,
          genero: response.data.data.genero,
          duracao: response.data.data.duracao,
          visualizacoes: response.data.data.visualizacoes,
          tipo: response.data.data.tipo,
          link: response.data.data.link,
          imagem: response.data.data.imagem,
          nome_usuario: response.data.data.nome_usuario
        };

        this.fetchRelatedVideos(this.data.video.genero);

      } catch (error) {
        console.error('Erro ao carregar vídeo:', error);
      }
    },

    async fetchRelatedVideos(genero: string) {
      try {
        const response = await axios.get(`http://localhost:8000/videos/genero/${genero}`);
        this.relatedVideos = response.data.data.filter((v: any) => v.video_id !== this.data.video.video_id);
      } catch (error) {
        console.error('Erro ao buscar vídeos relacionados:', error);
      }
    },

    async goToPageVideWithId(id:number) {
      router.push({ name: 'Video.Visualizar', params: { id } })
    },

    toggleIcon(type: 'like' | 'dislike' | 'love') {
      this.activeIcon = this.activeIcon === type ? null : type;
    },

    closeDialog() {
      this.isDialogOpen = false;
    },

   async addPlaylist() {
    try {
      const data = new FormData();
      data.append('usuario_id', this.data.playlist.usuario_id.toString());
      data.append('titulo', this.data.playlist.titulo);
      data.append('imagem', this.data.playlist.imagem as File);


      const response = await PlaylistService.criarPlaylist(data);
      console.log(response);
      
      const novaPlaylistId = response.id;

      if (!novaPlaylistId) {
        console.error('Erro: ID da nova playlist não retornado.');
        return;
      }


      this.data.playlistVideo.playlist_id = String(novaPlaylistId);
      this.data.playlistVideo.video_id = String(this.data.video.video_id);

      const form = new FormData();
      form.append("playlist_id", this.data.playlistVideo.playlist_id);
      form.append("video_id", this.data.playlistVideo.video_id);


      await PlaylistService.adicionarVideoNaPlaylist(form);

      this.playlistList = await this.listarPlaylist([]);

      this.closeDialog();
      this.data.playlist.titulo = '';

    } catch (error) {
      console.error('Erro ao adicionar vídeo à nova playlist:', error);
    }
  },



    async addVideoNaPlaylist(id: any) {
      try {
        if (!this.selectedPlaylistId) return;

        this.data.playlistVideo.playlist_id = String(this.selectedPlaylistId);
        this.data.playlistVideo.video_id = String(this.data.video.video_id);

        this.closeDialog();

        const form = new FormData();
        form.append("playlist_id", String(this.data.playlistVideo.playlist_id));
        form.append("video_id", String(this.data.playlistVideo.video_id));

        PlaylistService.adicionarVideoNaPlaylist(form)
          .then(res => console.log(res))
          .catch(err => console.error(err));
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },


    async listarPlaylist(items: any) {
      try {
        //console.log(this.data.playlist.usuario_id);
        
        const response = await PlaylistService.listarPlaylistsPorUsuario(Number(this.data.playlist.usuario_id))

        //console.log("items: ", response);
         items = response.data.map((item: any) => ({
          id: item.playlist_id,
          titulo: item.titulo,
        }));
                
        return items;

      }catch (error) {
        console.log('ERROR: ', error);
        
      }
    },

    openCriar() {
      this.step = 'criar';
    },

    initialDialog() {
      this.step = 'selecionar';
      this.isDialogOpen = true;
    },

    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        this.data.playlist.imagem = files[0];
      }
    },
    
  }
});
</script>

<template>
  <div class="p-10">
    {{ idPlaylist }}
    <div v-if="data.video.link" class="aspect-w-16 aspect-h-9">
      <div>
        <iframe
        class="w-full h-full"
        :src="data.video.link"
        frameborder="0"
        allowfullscreen
        style="border-radius: 30px;"
      ></iframe>
      </div>
    </div>

    <div class="pt-6 px-5 items-center content-center">
      <div class="flex justify-between pb-6">
        <div>
          <h2 class="text-2xl font-bold">{{ data.video.nome }}</h2>
        </div>
        <div>
          <p>{{ data.video.visualizacoes }} Visualizações</p>
        </div>
      </div>

      <div class="flex  border-y-2 items-center content-center mb-10 grid grid-cols-6 gap-3">
        <div class="flex gap-3 items-center border-r-2 pr-4 col-span-2 justify-center">
          <div class="flex gap-4 py-6 pr-4 ">
            <Avatar>
              <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p>{{ data.video.nome_usuario }}</p>
            <p class="text-[14px] text-gray-400">300 mil seguidores</p>
          </div>
          <div>
            <Button class="bg-[#7E57C2]" style="border-radius: 30px;">Seguir</Button>
          </div>
      </div>
      
      <div class="border-r-2 px-[5%] py-4 flex flex-col items-center ">
        <div class="pb-2" style="cursor: pointer;">
          
        </div>
        <div>
              <AlertDialog v-model:open="isDialogOpen">
                <AlertDialogTrigger as-child>
                 
                    <div class="flex flex-col items-center" @click="initialDialog" style="cursor: pointer;">
                      <CirclePlus/>
                      <p> Adicionar à Playlist</p>

                    </div>
                  
            
                </AlertDialogTrigger>

                <AlertDialogContent class="w-[430px]"  v-if="step === 'selecionar'">
                  <div v-if="step === 'selecionar'">

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

                  <AlertDialogContent class="w-[400px]" v-if="step === 'criar'">
                  <div >

                    <AlertDialogHeader>
                      <AlertDialogTitle>Salvar Playlist</AlertDialogTitle>
                    </AlertDialogHeader>

                         <div class="w-full p-3">
                            <form @submit.prevent="addPlaylist">
                              <div>
                                 <label for="imagem" class="w-full h-90 flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer text-gray-500 border-[#7E57C2]">
                                <CloudUpload :size="100" />
                                <span>Clique para enviar a imagem miniatura</span>
                                <input type="file" 
                                @change="(e: any) => data.playlist.imagem = e.target.files[0]" required />
                              </label>
                              </div>
                              <div class="pb-3">
                                <Label>Título</Label>
                                <Input v-model="data.playlist.titulo" placeholder="Título da Playlist" />
                              </div>

                              <div class="flex justify-end">
                                <Button @click="closeDialog">Cancelar</Button>
                                <Button type="submit">Criar</Button>
                              </div>
                            </form>
                          </div>

                  </div>
                </AlertDialogContent>

              </AlertDialog>

          </div>
        </div>
      <div class="border-r-2 px-[5%] py-4 flex flex-col items-center">
        <div class="pb-2">
          <Share2/>
        </div>
        <div>
          <p>Compartilhar</p>
          </div>
      </div>
      <div class="border-r-2 px-[5%] py-4 flex flex-col items-center ">
        <div class="pb-2">
          <CircleEllipsis/>
        </div>
        <div>
          <p>Mais</p>
          </div>
      </div>

      <div class="flex grid grid-cols-3 gap-4 items-center justify-center ">
        <div class="flex flex-col items-center" @click="toggleIcon('love')" style="cursor: pointer;">
          <Heart :class="activeIcon === 'love' ? 'fill-black' : 'fill-none'" />
          <p>10</p>
        </div>
        <div class="flex flex-col items-center" @click="toggleIcon('like')" style="cursor: pointer;">
          <ThumbsUp :class="activeIcon === 'like' ? 'fill-black ' : 'fill-none'" />
          <p>10</p>
        </div>
        <div class="flex flex-col items-center" @click="toggleIcon('dislike')" style="cursor: pointer;">
          <ThumbsDown :class="activeIcon === 'dislike' ? 'fill-black ' : 'fill-none'" />
          <p>10</p>
        </div>
      </div>
      </div>
     

      <div class="m">
        <p>{{ data.video.descricao }}</p>
      </div>
    </div>
   
    <div class="mt-10 px-5">

      <h3 class="text-xl font-semibold mb-4">Vídeos Relacionados</h3>

      <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
      <div
        v-for="video in relatedVideos"
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
        <div class="flex mt-3 gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 class="font-bold text-base">{{ video.nome }}</h3>
            <p class="text-xs">{{ video.nome_usuario }}</p>
          </div>
        </div>

      </div>
    </div>
</div>

  </div>
  
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
}
.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
