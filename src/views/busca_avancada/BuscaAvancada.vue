<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BuscaAvancadaService } from '@/services/busca.service';

export default defineComponent({
  data() {
    return {
      filtros: {
        generos: [] as string[],
        tipos: [] as string[],
        duracao: [] as string[]
      },
      videos: [] as any[],
      carregando: false
    };
  },
  mounted() {
    this.buscarVideos();
  },
  methods: {
    async buscarVideos() {
        const filtrosConvertidos = {
            genero: this.filtros.generos.join(','),
            tipo: this.filtros.tipos.join(','),
            
        };

        try {
            const response = await BuscaAvancadaService.buscarVideosAvancado(filtrosConvertidos);
            this.videos = response.videos;
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
        }

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
  <div class="w-full h-full mx-5">
    <div class="grid grid-cols-5 pt-4 gap-4">
      
      <div class="col-span-1 space-y-4">
        
        <div>
          <h3 class="font-bold mb-2">Gênero</h3>
          <div v-for="genero in ['Ação', 'Drama', 'Comédia', 'Terror']" :key="genero">
            <label class="flex items-center space-x-2">
              <input type="checkbox" :value="genero" v-model="filtros.generos" />
              <span>{{ genero }}</span>
            </label>
          </div>
        </div>

        <div>
          <h3 class="font-bold mb-2">Tipo</h3>
          <div v-for="tipo in ['Filme', 'Série', 'Documentário']" :key="tipo">
            <label class="flex items-center space-x-2">
              <input type="checkbox" :value="tipo" v-model="filtros.tipos" />
              <span>{{ tipo }}</span>
            </label>
          </div>
        </div>

        
      </div>

      <div class="col-span-4">
        <div v-if="carregando" class="text-gray-500">Carregando...</div>
        <div v-else>
          <div v-if="videos.length === 0" class="text-gray-600">Nenhum vídeo encontrado.</div>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="video in videos" :key="video.id" class="border rounded-lg p-3 shadow-sm">
              <h3 class="font-semibold text-lg">{{ video.nome }}</h3>
              <p class="text-sm">{{ video.descricao }}</p>
              <p class="text-xs text-gray-500">Tipo: {{ video.tipo }} | Gênero: {{ video.genero }}</p>
              <p class="text-xs text-gray-500">Duração: {{ video.duracao }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

