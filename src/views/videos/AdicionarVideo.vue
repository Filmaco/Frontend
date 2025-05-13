<script lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { defineComponent, ref, onMounted } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import TagsInput from '@/components/ui/tags-input/TagsInput.vue';
import TagsInputInput from '@/components/ui/tags-input/TagsInputInput.vue';
import TagsInputItem from '@/components/ui/tags-input/TagsInputItem.vue';
import TagsInputItemDelete from '@/components/ui/tags-input/TagsInputItemDelete.vue';
import TagsInputItemText from '@/components/ui/tags-input/TagsInputItemText.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { CloudUpload, User } from 'lucide-vue-next';
import axios from 'axios';
import { toast } from 'vue-sonner';
import { UserService } from '@/services/user.service';

export default defineComponent({
  components: {
    Input,
    Button,
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
    TagsInputItemText,
    Separator,
    CloudUpload
  },
  data() {
    return {
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

      erros: {} as Record<string, string>,
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
        // Documentário
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
      ]
    }
  },
  computed: {
    generosFiltrados() {
      return this.generos.filter(g => g.tipoId === this.video.tipo);
    }
  },
  mounted() { 
    UserService.perfil()
      .then(user => {
        this.user.usuario_id = user.usuario.usuario_id;
        //console.log('user: ', this.data.user);
        
      })
      .catch((e) => {
          console.log(e);
          
      });
  },
  methods: {
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        this.video.imagem = files[0];
      }
    },
    validarCampos() {
      this.erros = {}
      if (!this.video.nome) this.erros.nome = 'Nome é obrigatório';
      if (!this.video.descricao) this.erros.descricao = 'Descrição é obrigatória';
      if (!this.video.tipo) this.erros.tipo = 'Tipo é obrigatório';
      if (!this.video.genero) this.erros.genero = 'Gênero é obrigatório';
      if (!this.video.duracao) this.erros.duracao = 'Duração é obrigatória';
      if (!this.video.link) this.erros.link = 'Link é obrigatório';
      if (!this.video.imagem) this.erros.imagem = 'Imagem é obrigatória';

      if (Object.keys(this.erros).length > 0) {
        toast.error('Campos obrigatórios com erro', {
          description: Object.values(this.erros).join(', ')
        });
        return false;
      }
      return true;
    },

    async criarVideo() {
      this.enviando = true;
      if (!this.validarCampos()) {
        this.enviando = false;
        return;
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
       
      } catch (error) {
        console.log(error, this.video);
        
      } finally {
        this.enviando = false;
      }
    },
    
  }
})
</script>


<template>
  <div class="flex justify-center">
    
    <form @submit.prevent="criarVideo" class="w-full">
      <div class="flex gap-6">
        <div class="w-[50%]">
          <Input v-model="video.nome" placeholder="Título" class="ml-2 mb-1" />
          <textarea v-model="video.descricao" placeholder="Descrição" class="mx-2 my-3 h-32 p-3 w-full border rounded text-sm"></textarea>

          <div class="flex justify-between mx-2 mb-4 w-[100%]">
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

          </div>
          <div class="relative w-full h-10 m-2 mt-9">
              <input  type="number"
                  class="bg-[#f7effe] peer w-full h-full bg-transparent text-black font-sans 
                  font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border 
                  placeholder-shown:border-indigo-400 placeholder-shown:border-t-indigo-400 border focus:border-2 border-t-transparent 
                  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-indigo-400 focus:border-indigo-400"
                  placeholder="exemplo input bonita " />
              <label
                  class=" flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate 
                  peer-placeholder-shown:text-black leading-tight peer-focus:leading-tight peer-disabled:text-transparent 
                  peer-disabled:peer-placeholder-shown:text-black transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px]
                  peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] 
                  before:mr-3 peer-placeholder-shown:before:border-transparent before:rounded-tl-[10px] before:border-t
                  peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all 
                  peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5
                  after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-[10px] after:border-t 
                  peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all
                  peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-black peer-focus:text-indigo-400 
                  before:border-red-200 peer-focus:before:!border-indigo-400  after:border-indigo-400 peer-focus:after:!border-indigo-400 peer-focus:!rounded-[10px]"
                  style="border-radius: 10px;">Paginas
              </label>
          </div>          
          <TagsInput v-model="video.tags" class="mb-4 ml-2">
            <TagsInputItem v-for="item in video.tags" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>
            <TagsInputInput placeholder="Digite as tags..." />
          </TagsInput>

          <Input v-model="video.duracao" placeholder="Duração com segundos" class="mb-4 mx-2" />

          <Input v-model="video.link" placeholder="Link" class="m-2" />
        </div>

        <label for="imagem" class="w-full h-90 flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer text-gray-500 border-[#7E57C2]">
          <CloudUpload :size="100" />
          <span>Clique para enviar a imagem miniatura</span>
          <input type="file" 
          @change="(e: any) => video.imagem = e.target.files[0]" required />
        </label>
      </div>

      <div class="w-full flex justify-between mt-16 mx-2">
        <Button class="w-[20%]" style="border-radius: 30px;">Cancelar</Button>
        <Button class="w-[20%] bg-[#7E57C2] hover:bg-[#513188]" style="border-radius: 30px;" type="submit">Adicionar</Button>
      </div>
    </form>
  </div>
</template>


<style scoped>
</style>
