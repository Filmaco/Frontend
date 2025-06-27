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
import { CloudUpload, LucideEdit, User } from 'lucide-vue-next';
import axios from 'axios';
import { toast } from 'vue-sonner';
import { UserService } from '@/services/user.service';
import Label from '@/components/ui/label/Label.vue';
import { VideoService } from '@/services/video.service';

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
    CloudUpload,
    Label,
    LucideEdit
  },
  props: {
    videoId: {
      type: String,
      required: false,
      default: null
    }
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

      console.log(this.videoId);
      

      if (this.videoId !== null) {
        VideoService.buscarPorId(this.videoId)
          .then(response => {
            const data = response.data;
            this.video = {
              usuario_id: data.usuario_id || '',
              nome: data.nome || '',
              descricao: data.descricao || '',
              tipo: data.tipo || '',
              genero: data.genero || '',
              duracao: data.duracao || '',
              link: data.link || '',
              imagem:  data.imagem, 
              tags: data.tags?.split(',') || []
            };
            console.log('DATA', this.video);


            
          })
          .catch(error => {
            console.error('Erro ao carregar vídeo:', error);
          });
      }
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

    async pegarTagPorId(id: number) {
      const response = await VideoService.buscarNomeTagPorId(id)
      console.log(response);
      
    },

    async atualizarVideo() {
      try {
        const formData = new FormData();
        formData.append('nome', this.video.nome);
        formData.append('descricao', this.video.descricao);
        formData.append('tipo', this.video.tipo);
        formData.append('genero', this.video.genero);
        formData.append('duracao', this.video.duracao);
        formData.append('link', this.video.link);
        
        if (this.video.imagem instanceof File) {
          formData.append('imagem', this.video.imagem);
        }

        formData.append('tags', this.video.tags.join(','));

        const response = await VideoService.editarVideo(this.videoId, formData);

        window.location.reload();
        return response;

      } catch (error) {
        alert('Erro ao atualizar vídeo.');
        console.error(error);
      }
    },

     handleFileChange(event) {
        const file = event.target.files[0]
        if (file) {
          this.video.imagem = file
        }
    },

     onTagsUpdate(novasTags: string[]) {
        // if (novasTags.length < this.video.tags.length) {
          console.log('oi'); // A tag foi removida
        // }
        // this.video.tags = novasTags; // Atualiza o estado
      }

  }
})
</script>


<template>
  <div class="flex justify-center">
   
    <form @submit.prevent="atualizarVideo" class="w-full">
      <div class="flex gap-6">
        <div class="w-[50%]">
          <Label class="ml-2">Título</Label>
          <Input v-model="video.nome" placeholder="Título" class="ml-2 mb-1" />
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
            </div>

            <div>
              <Label class="ml-2 ">Gênero do Video</Label>
              <Select v-model="video.genero" :disabled="!video.tipo">
                <SelectTrigger>
                  <SelectValue :placeholder="video.genero" />
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
           
          </div>
        
          <Label class="ml-2 ">Duração do Video com segundos</Label>
          <Input v-model="video.duracao" placeholder="Duração com segundos" class="mb-4 mx-2" />

           <Label class="ml-2 ">Link do Video (Youtube)</Label>
          <Input v-model="video.link" placeholder="Link" class="m-2" />
        </div>

        <div for="imagem" class="w-full h-90 flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer text-gray-500 border-[#7E57C2]">
            <div class="flex flex-col items-center relative w-full h-[180px] ">
              <label class="relative cursor-pointer">
                <img
                  :src="`http://localhost:8000/uploads/${video.imagem}`"
                  alt="Foto de perfil"
                  class="w-full h-[180px] object-cover rounded-md"
                />
                <div
                  class="absolute bottom-[-10px] right-2 bg-white p-1  shadow-md rounded-full"
                >
                  <LucideEdit class="w-5 h-5 text-gray-600" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
              </label>
            </div>
          </div>
      
      </div>

      <div class="w-full flex justify-between mt-16 mx-2">
        <Button class="w-[20%]" style="border-radius: 30px;">Cancelar</Button>
        <Button class="w-[20%] bg-[#7E57C2] hover:bg-[#513188]" style="border-radius: 30px;" type="submit">Atualizar</Button>

      </div>
    </form>
  </div>
</template>


<style scoped>
</style>