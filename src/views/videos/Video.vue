<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue';
import { CirclePlus, Share2, CircleEllipsis, Frown, Smile, Laugh, ThumbsDown, ThumbsUp, Heart, Trash  } from 'lucide-vue-next';
import router from '@/routes';
import CriarPlaylist from '@/views/playlist/CriarPlaylist.vue'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import { ComentarioService } from '@/services/comentario.service';
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
import { AvaliacaoService } from '@/services/avaliacao.service';

FilePond.registerPlugin(FilePondPluginImagePreview);


interface Playlist {
  id: number,
  titulo: string,
}

interface Comentarios {
  comentario_id: number,
  conteudo: string,
  video_id: string,
  nome_completo: string,
  foto_perfil: string,
  usuario_id: number
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
    Trash
  },
  data() {
    return {
      is_dialog_open: false,
      teste: true,
      step: 'selecionar',
      playlist_list: [] as Playlist[],
      id: 0,
      id_playlist: 0,
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
        usuario_id: 0,
        playlist: {
          usuario_id: '',
          titulo: '',
          imagem: null as File | null,
        },
        playlist_video: {
           playlist_id: '',
           video_id: ''
        }
      },
      criar: true,
      related_videos: [] as any[],
      activeIcon: null as null | 'like' | 'dislike' | 'love',
      selected_playlist_id:  null as (number | null),
      video_in_playlists: [] as number[],
      comentarios: [] as Comentarios[],
      novo_comentario: '',
      usuario_atual: null as any,
      avaliacoes: {
        usuario_id: '',
        video_id: '',
        avaliacao: ''
      },
      edit_avaliacao: {
        avaliacao_id: null as (number | null),
        avaliacao: ''
      }
    };
  },

  async mounted() {
    this.id = Number(this.$route.params.id);
    this.handleVideo(this.id);

   
    UserService.perfil()
    .then(async user => {
     
      
      this.data.playlist.usuario_id = user.usuario.usuario_id;
      this.data.usuario_id = user.usuario.usuario_id;
      console.log('user: ',  this.data.usuario_id);
      
      this.playlist_list = await this.listarPlaylist(this.playlist_list )
      this.usuario_atual = user.usuario;
    })
    .catch((e) => {
        console.log(e);
        
    });
    
    this.comentarios = await this.carregarComentarios(this.comentarios);
    console.log(this.comentarios);
    
    console.log( this.is_dialog_open);
    
    AvaliacaoService.listarAvaliacaoPorVideo(this.id)
    
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
        this.related_videos = response.data.data.filter((v: any) => v.video_id !== this.data.video.video_id);
      } catch (error) {
        console.error('Erro ao buscar vídeos relacionados:', error);
      }
    },

    async goToPageVideWithId(id:number) {
      router.push({ name: 'Video.Visualizar', params: { id } })
    },


    closeDialog() {
      this.is_dialog_open = false;
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


      this.data.playlist_video.playlist_id = String(novaPlaylistId);
      this.data.playlist_video.video_id = String(this.data.video.video_id);

      const form = new FormData();
      form.append("playlist_id", this.data.playlist_video.playlist_id);
      form.append("video_id", this.data.playlist_video.video_id);


      await PlaylistService.adicionarVideoNaPlaylist(form);

      this.playlist_list = await this.listarPlaylist([]);

      this.closeDialog();
      this.data.playlist.titulo = '';

    } catch (error) {
      console.error('Erro ao adicionar vídeo à nova playlist:', error);
    }
  },

    async addVideoNaPlaylist(id: any) {
      try {
        if (!this.selected_playlist_id) return;

        this.data.playlist_video.playlist_id = String(this.selected_playlist_id);
        this.data.playlist_video.video_id = String(this.data.video.video_id);

       

        const form = new FormData();
        form.append("playlist_id", String(this.data.playlist_video.playlist_id));
        form.append("video_id", String(this.data.playlist_video.video_id));

        PlaylistService.adicionarVideoNaPlaylist(form)
          .then(res => console.log(res))
          .catch(err => console.error(err));

         this.closeDialog();
         console.log( this.is_dialog_open);
         
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },

    async listarPlaylist(items: any) {
      try {
        const response = await PlaylistService.listarPlaylistsPorUsuario(Number(this.data.playlist.usuario_id));

        const playlists = response.data.map((item: any) => ({
          id: item.playlist_id,
          titulo: item.titulo,
        }));

        this.video_in_playlists = [];

        for (const playlist of response.data) {
          const videos = await PlaylistService.listarVideosDaPlaylist(playlist.playlist_id);
          const videoIds = videos.data.map((v: any) => v.video_id);

          if (videoIds.includes(this.data.video.video_id)) {
            this.video_in_playlists.push(playlist.playlist_id);
          }
        }

        return playlists;
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },

    openCriar() {
      this.step = 'criar';
    },

    initialDialog() {
      this.step = 'selecionar';
      this.is_dialog_open = true;
    },

    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        this.data.playlist.imagem = files[0];
      }
    },

    async carregarComentarios(items: any) {
      console.log(this.id);
      
      try {
        const response = await ComentarioService.listarComentariosPorVideo(this.id);

        items = response.dados.map((item: any) => ({
          conteudo: item.conteudo,
          comentario_id: item.comentario_id,
          video_id: item.video_id,
          nome_completo: item.nome_completo,
          foto_perfil: item.foto_perfil,
          usuario_id: item.usuario_id
        }));
        console.log(response);
        
        return items
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    },

    async addComentario() {
      if (!this.novo_comentario.trim()) return;

      const formData = new FormData();
      formData.append("video_id", String(this.data.video.video_id));
      formData.append("usuario_id", String(this.usuario_atual.usuario_id));
      formData.append("conteudo", this.novo_comentario);

      try {
        await ComentarioService.adicionarComentario(formData);
        this.novo_comentario = '';
        this.comentarios = await this.carregarComentarios(this.comentarios);
      } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
      }
    },

    async excluirComentario(id: number) {
      try {
        const usuario = Number(this.data.playlist.usuario_id);
        await ComentarioService.excluirComentario(id, usuario);

        this.comentarios = this.comentarios.filter(comentario => comentario.comentario_id !== id);
      } catch (error) {
        console.log(error);
      }
    },

    async toggleVideoInPlaylist(playlistId: number, checked: boolean) {
      const form = new FormData();
      form.append("playlist_id", String(playlistId));
      form.append("video_id", String(this.data.video.video_id));

      try {
        if (checked) {
          await PlaylistService.adicionarVideoNaPlaylist(form);
          this.video_in_playlists.push(playlistId);
        } else {
          await PlaylistService.removerVideoDaPlaylist(playlistId, this.id);
          this.video_in_playlists = this.video_in_playlists.filter(id => id !== playlistId);
        }
      } catch (error) {
        console.error("Erro ao atualizar vídeo na playlist:", error);
      }
    },

   toggleIcon(type) {
    const tipoParaNumero = {
      dislike: 1,
      like: 2,
      love: 3,
    };

    const valorNumerico = tipoParaNumero[type];

    if (this.activeIcon === type && this.edit_avaliacao.avaliacao_id) {
      this.activeIcon = null;
      this.deletarAvaliacao(); 
      return;
    }

    this.activeIcon = type;

    if (this.edit_avaliacao.avaliacao_id) {
      this.editarAvaliacao(valorNumerico);
    } else {
      this.addAvaliacao(valorNumerico);
    }
  },

    async addAvaliacao(valor) {
      const formData = new FormData();
      formData.append('usuario_id', String(this.data.usuario_id));
      formData.append('video_id', String(this.id));
      formData.append('avaliacao', valor); 
      try {
        const response = await AvaliacaoService.criarAvaliacao(formData);
        console.log(response);
        
        this.edit_avaliacao.avaliacao_id = response.id; 
        alert("Avaliação adicionada");
      } catch (error) {
        console.error(error);
        alert("Erro ao adicionar avaliação");
      }
    },

    async editarAvaliacao(valor) {
      const formData = new FormData();
      formData.append('avaliacao', valor);

      try {
        await AvaliacaoService.editarAvaliacao(this.edit_avaliacao.avaliacao_id, formData);
        alert("Avaliação atualizada");
      } catch (error) {
        console.error(error);
        alert("Erro ao editar avaliação");
      }
    },

    async deletarAvaliacao() {
      try {
        await AvaliacaoService.deletarAvaliacao(this.edit_avaliacao.avaliacao_id);
        this.edit_avaliacao.avaliacao_id = null;
        alert("Avaliação removida");
      } catch (error) {
        console.error(error);
        alert("Erro ao remover avaliação");
      }
    }
    
    
  }
});
</script>

<template>
  <div class="p-10">
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
              <AlertDialog v-model:open="is_dialog_open">
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
                        v-for="(playlist, index) in playlist_list"
                        :key="index"
                        class="flex items-center space-x-2"
                      >
                      <Checkbox
                        :id="`playlist-${index}`"
                        :modelValue="video_in_playlists.includes(playlist.id)"
                        @update:modelValue="(checked) => toggleVideoInPlaylist(playlist.id, checked)"
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
                    </div>
                    
                    <Separator orientation="horizontal"/>
                    
                    <AlertDialogFooter>
                      
                      <div class="mt-2 flex w-full justify-between">
                        <Button class="mr-2" @click="closeDialog">Sair</Button>
                      
                            <Button @click="openCriar">Criar nova playlist</Button>

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
   
    <!-- <div class="mt-10 px-5">

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
</div> -->

  <div>
      <div class="mt-10 px-5">
        <h3 class="text-xl font-semibold mb-4">Comentários</h3>

       
        <form @submit.prevent="addComentario" class="mb-6">
          <div class="flex flex-col gap-2">
            <label for="novo_comentario">Adicionar comentário:</label>
            <Input
              id="novo_comentario"
              v-model="novo_comentario"
              placeholder="Escreva seu comentário..."
              class="w-full"
            />
            <Button type="submit" class="w-fit">Enviar</Button>
          </div>
        </form>

       
        <div class="space-y-4">
          <div
            v-for="(comentario, index) in comentarios"
            :key="index"
            class="p-4 border rounded-lg shadow-sm bg-gray-50 flex"
          >
            <div class="flex items-center gap-2 mb-2">
              <div >
                
                <img
                  v-if="comentario.foto_perfil"
                  :src="`http://localhost:8000/uploads/${comentario.foto_perfil}`"
                  alt="Thumbnail"
                  class="mt-2 h-auto w-[63px] object-cover rounded-full"
                />
                 <Avatar v-else  class="h-auto w-[53px] flex items-center justify-center">
                    <AvatarImage src="https://github.com/unovue.png" alt="@unovue" class="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
              </div>
            </div>
          
            <div class="flex justify-between w-full items-center ml-4">
              <div>
                <p class="text-[12px]">{{ comentario.nome_completo }}</p>
                <p class="text-base">{{ comentario.conteudo }}</p>
                
              </div>
              <Trash style="cursor: pointer;" @click="excluirComentario(comentario.comentario_id)" v-if="data.usuario_id == comentario.usuario_id"/>
            </div>
          </div>
        </div>
        <!-- <div v-else>
          <p class="text-gray-500">Nenhum comentário ainda.</p>
        </div> -->
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
