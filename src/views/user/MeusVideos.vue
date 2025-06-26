<script lang="ts">
import { defineComponent } from 'vue';
import { UserService } from '@/services/user.service';
import { VideoService } from '@/services/video.service';
import router from '@/routes';
import columns from '@/components/datatable/video.table';
import { Data } from '@/components/datatable/data.videos';
import DataTableVideo from '@/components/datatable/DataTableVideo.vue';
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
import Separator from "@/components/ui/separator/Separator.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import { Button } from '@/components/ui/button'
import EditarVideo from '../videos/EditarVideo.vue';

interface Video {
    id: number,
    nome: string
    visualizacoes:number
    criado_em: Date
    imagem: string 
    atualizado_em: Date 
    status: 'ativo' | 'inativo'
}



export default defineComponent({
    components: {
        DataTableVideo,
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
        Separator,
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
        EditarVideo,
    },
    data() {
        return {
            usuario: {
                usuario_id: '',
                nome_completo: '',
                username: '',
                email: '',
                senha: '',
                data_nascimento: '',
                foto_perfil: null as File | null,
                genero: '',
                biografia: '',
                },
            videos: [] as Video[],
            columns,
            data: [] as Data[],
            isDialogOpen: false,
            videoIdSelecionado: null as number | null,
        }
    },
    async mounted() {  
        this.data = await this.loadItems(this.data);
        console.log('mounted', this.data);
    },
    methods: {
        async getVideos(id:string) {
            try {
              
                const response = await VideoService.listarVideosPorUsuario(id)
               
                
                const data = await response.data.map((item:any) => ({
                    id: item.video_id,
                    usuario_id: item.usuario_id,
                    nome: item.nome,
                    imagem: item.imagem,
                    visualizacoes: item.visualizacoes,
                    nome_usuario: item.nome_usuario,
                    status: item.status,
                    criado_em: this.formatDate(item.criado_em),
                    atualizado_em: this.formatDate(item.atualizado_em),
                    
                }))
                
                return data;
              
            } catch (error) {
                console.error('Erro ao buscar vídeos:', error);
            }
        },
         formatDate(dateString: any) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0'); 
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
            },
        async goToPageVideWithId(id:number) {
            //router.push({ name: 'Video.Visualizar', params: { id } })
            this.videoIdSelecionado = id;
            this.isDialogOpen = true;
        },
        inativar(id: number) {
            VideoService.inativarVideo(id)
            .then((response) => {
                window.location.reload()
                return response;
            })
            .catch((error) => console.log(error)
            )
        },

        ativar(id: number) {
            VideoService.ativarVideo(id)
            .then((response) => {
                window.location.reload()
                return response;
            })
            .catch((error) => console.log(error)
            )
        },
        async loadItems(items:any) { 
            try {
                const user = await UserService.perfil();
                this.usuario = user.usuario;

                const videos = await this.getVideos(this.usuario.usuario_id);
                this.videos = videos;
                console.log('videos:', this.videos);
                

                items = videos.map((video: any) => ({
                    video_id: video.id,
                    nome: video.nome,
                    visualizacoes: video.visualizacoes,
                    imagem: `http://localhost:8000/uploads/${video.imagem}`,
                    status: video.status,
                    criado_em: video.criado_em,
                    atualizado_em: video.atualizado_em
                }));
                return items;
            } catch (e) {
                console.log('Erro ao carregar perfil:', e);
                router.push({ name: 'Home' })
            }

        }
    },
    
})


</script>

<template>
    <div class="p-3">

        <!-- <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
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
        </div> -->

        <div class="mt-10">
            <p class="text-xl font-semibold mb-4">Meus Vídeos</p>
            <DataTableVideo :data="data" :columns="columns" @handle-click-get-id="goToPageVideWithId" @ativar-por-id="ativar" @inativar-por-id="inativar"/>

            <AlertDialog v-model:open="isDialogOpen">
                <AlertDialogContent class="max-w-[900px]">
                    <div class="w-full flex justify-between">
                    <p class="text-2xl mb-5 ml-2">Detalhes do vídeo</p>
                    <AlertDialogCancel class="border-0 bg-transparent w-[10px]">X</AlertDialogCancel>
                    </div>

                    <Separator orientation="horizontal" class="w-[95%] ml-[-7px]" />
                    <EditarVideo :video-id="videoIdSelecionado" />
                    
                </AlertDialogContent>
                </AlertDialog>

        </div>
    </div>
</template>