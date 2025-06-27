<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BuscaAvancadaService } from '@/services/busca.service';
import { UserService } from '@/services/user.service';
import router from '@/routes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card';
import { TagService } from '@/services/tag.service';
import { ScrollArea } from '@/components/ui/scroll-area'

interface Tag {
  nome_tag: string;
}

export default defineComponent({
  components: {
    Card,
    CardContent,
    Avatar,
    AvatarFallback,
    AvatarImage,
    ScrollArea
  },
  data() {
    return {
      filtros: {
        nome: "",
        generos: [] as string[],
        tipos: [] as string[],
        tags: [] as string[],
        duracao: "",
        data_inicio: "",
        data_fim: ""
      },
      videos: [] as any[],
      carregando: false,
      id: 0,
      filtros_data: {
        tipos: [
          { nome: "Documentário", id: "documentario" },
          { nome: "Música", id: "clipe musical" },
          { nome: "Filme", id: "longa-metragem" },
          { nome: "Curta-metragem", id: "curta-metragem" },
          { nome: "Série", id: "serie" },
          { nome: "Animação", id: "animacao" },
        ],
        generos: [
          { id: "Animacao", nome: "Animação" },
          { id: "Acao", nome: "Ação" },
          { id: "Aventura", nome: "Aventura" },
          { id: "Biografia", nome: "Biografia" },
          { id: "Classica", nome: "Clássica" },
          { id: "Comedia", nome: "Comédia" },
          { id: "Cultural", nome: "Cultural" },
          { id: "Drama", nome: "Drama" },
          { id: "Eletronica", nome: "Eletrônica" },
          { id: "Experimental", nome: "Experimental" },
          { id: "Ficcao-Cientifica", nome: "Ficção Científica" },
          { id: "Historia", nome: "História" },
          { id: "Indie", nome: "Indie" },
          { id: "MPB", nome: "MPB" },
          { id: "Pop", nome: "Pop" },
          { id: "Rock", nome: "Rock" },
          { id: "Romance", nome: "Romance" },
          { id: "Social", nome: "Social" },
          { id: "Suspense", nome: "Suspense" },
          { id: "Terror", nome: "Terror" },
          { id: "2D", nome: "2D" },

        ],

        tags: [] as Tag[],
      }
    };
  },
  mounted() {
    this.buscarVideos();

    UserService.perfil()
      .then((response) => {
          console.log('perfil',response.usuario.tipo);
          this.id = response.usuario.usuario_id   
      })
      .catch((error) => console.log(error))

      this.getTags()
  },
  methods: {
    async buscarVideos() {
        const filtrosConvertidos = {
          generos: this.filtros.generos,
          tipos: this.filtros.tipos,
          tags: this.filtros.tags,
          nome: this.filtros.nome,
          duracao: this.filtros.duracao,
          data_inicio: this.filtros.data_inicio,
          data_fim: this.filtros.data_fim,
        };


        try {
            const response = await BuscaAvancadaService.buscarVideosAvancado(filtrosConvertidos);
            this.videos = response.videos;
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
    },
     async goToPageVideWithId(id:number) {
      router.push({ name: 'Video.Visualizar', params: { id } })
      console.log('aqui');
      
    },

    async goToPerfilWithId(nome:string) {
      try {
        const response = await UserService.getUserByName(nome);
        const id = response.usuario_id
        if (id == this.id) {
          router.push({ name: 'Usuario.Meu.Perfil'})

        }else {
          router.push({ name: 'Usuario.Perfil', params: { id } })
        }
        // window.location.reload()
      }
      catch (e) {
        console.log('EEROR: ',e);
        
      }
      //router.push({ name: 'Usuario.Perfil', params: { id } })
    },

    async getTags() {
      try {
        const response = await TagService.listarTags();
        const todasTags = response.data.map((item: any) => item.nome_tag);

        const unicas = [...new Set(todasTags)] as string[];
        this.filtros_data.tags = unicas.map((nome: string) => ({ nome_tag: nome }));


      } catch (error) {
        console.error(error);
      }
    },

  },
  watch: {
    filtros: {
      handler: 'buscarVideos',
      deep: true
    }
  }
});
</script>


<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-6 pt-4 gap-2">
      <div class="col-span-1 space-y-4 pl-4">
        <ScrollArea class="border rounded-md py-5 px-3 h-[90vh] w-60">
          
          <div class="mb-3">
            <h3 class="font-bold mb-2">Nome</h3>
            <input type="text" v-model="filtros.nome" class="border rounded px-2 py-1 w-full" placeholder="Buscar por nome..." />
          </div>

           <div>
            <h3 class="font-bold mb-3">Tipo</h3>
            <div v-for="tipo in filtros_data.tipos" :key="id" class="mb-1">
              <label class="flex items-center space-x-2">
                <input type="checkbox" :value="tipo.id" v-model="filtros.tipos" />
                <span>{{ tipo.nome }}</span>
              </label>
            </div>
          </div>

          <div class="mb-3">
            <h3 class="font-bold mb-2">Gênero</h3>
            <div v-for="genero in filtros_data.generos" :key="genero.id" class="mb-1">
              <label class="flex items-center space-x-2">
                <input type="checkbox" :value="genero.id" v-model="filtros.generos" />
                <span>{{ genero.nome }}</span>
              </label>
            </div>
          </div>
  
         

          <!-- <div>
            <h3 class="font-bold mb-2 mt-4">Duração</h3>
            <select v-model="filtros.duracao" class="border rounded px-2 py-1 w-full">
              <option value="">Todas</option>
              <option value="curta">Curta</option>
              <option value="media">Média</option>
              <option value="longa">Longa</option>
            </select>
          </div> -->

          <div>
            <h3 class="font-bold mb-2 mt-4">Tags</h3>
            <div v-for="tag in filtros_data.tags" :key="tag.nome_tag" class="mb-1">
              <label class="flex items-center space-x-2">
                <input type="checkbox" :value="tag.nome_tag" v-model="filtros.tags" />
                <span>{{ tag.nome_tag }}</span>
              </label>
            </div>
          </div>

          <div>
            <h3 class="font-bold mb-2 mt-4">Data de Publicação</h3>
            <label class="text-sm">De:</label>
            <input type="date" v-model="filtros.data_inicio" class="border rounded px-2 py-1 w-full mb-1" />
            <label class="text-sm">Até:</label>
            <input type="date" v-model="filtros.data_fim" class="border rounded px-2 py-1 w-full" />
          </div>

        </ScrollArea>
      </div>

      <div class="col-span-5">
        <div v-if="carregando" class="text-gray-500">Carregando...</div>
        <div v-else>
          <div v-if="videos.length === 0" class="text-gray-600">Nenhum vídeo encontrado.</div>
          <div class="">
            <!-- <div v-for="video in videos" :key="video.id" class="border rounded-lg p-3 shadow-sm">
              <h3 class="font-semibold text-lg">{{ video.nome }}</h3>
              <p class="text-sm">{{ video.descricao }}</p>
              <p class="text-xs text-gray-500">Tipo: {{ video.tipo }} | Gênero: {{ video.genero }}</p>
              <p class="text-xs text-gray-500">Duração: {{ video.duracao }}</p>
            </div> -->
             <div  class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4  w-ful">
                <div
                  v-for="video in videos"
                  :key="video.video_id"
                  class="" 
                  style="cursor: pointer;"
                
                >
                  <div @click="goToPageVideWithId(video.video_id)">
                    <img
                      v-if="video.imagem"
                      :src="`http://localhost:8000/uploads/${video.imagem}`"
                      alt="Thumbnail"
                      class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
                    />
                  </div>
                  <div class="flex mt-3 gap-4 flex-col">
                    <div class="flex flex-row">
                     
                      <Avatar @click="goToPerfilWithId(video.nome_usuario)" class="mr-3">
                        <AvatarImage :src="`http://localhost:8000/uploads/${video.foto_perfil}`" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3  @click="goToPageVideWithId(video.video_id)" class="font-bold text-base">{{ video.nome }}</h3>
                        <p class="text-xs" @click="goToPerfilWithId(video.nome_usuario)">{{ video.nome_usuario }}</p>
                      </div>
                    </div>
                    <div>

                      <p class="text-xs text-gray-500">Tipo: {{ video.tipo }} | Gênero: {{ video.genero }}</p>
                       <p class="text-xs text-gray-500">Duração: {{ video.duracao }}</p>
                    </div>
                  </div>

                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

