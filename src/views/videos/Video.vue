<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue';
import { CirclePlus, Share2, CircleEllipsis, Frown, Smile, Laugh, ThumbsDown, ThumbsUp, Heart  } from 'lucide-vue-next';
import router from '@/routes';

export default defineComponent({
  name: 'VideoPlayer',
  components: {
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
  },
  data() {
    return {
      id: 0, 
      data: {
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
      relatedVideos: [] as any[],
      activeIcon: null as null | 'like' | 'dislike' | 'love',
    };
  },

  mounted() {
    this.id = Number(this.$route.params.id);
    this.handleVideo(this.id);
  },

  methods: {
    async handleVideo(id: number) {
      try {
        const response = await axios.get(`http://localhost:8000/videos/${id}`);
        console.log(response.data);

        this.data = {
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

        this.fetchRelatedVideos(this.data.genero);

      } catch (error) {
        console.error('Erro ao carregar vídeo:', error);
      }
    },

    async fetchRelatedVideos(genero: string) {
      try {
        const response = await axios.get(`http://localhost:8000/videos/genero/${genero}`);
        this.relatedVideos = response.data.data.filter((v: any) => v.video_id !== this.data.video_id);
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

    
  }
});
</script>

<template>
  <div class="p-10">
    <div v-if="data.link" class="aspect-w-16 aspect-h-9">
      <div>
        <iframe
        class="w-full h-full"
        :src="data.link"
        frameborder="0"
        allowfullscreen
        style="border-radius: 30px;"
      ></iframe>
      </div>
    </div>

    <div class="pt-6 px-5 items-center content-center">
      <div class="flex justify-between pb-6">
        <div>
          <h2 class="text-2xl font-bold">{{ data.nome }}</h2>
        </div>
        <div>
          <p>{{ data.visualizacoes }} Visualizações</p>
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
            <p>{{ data.nome_usuario }}</p>
            <p class="text-[14px] text-gray-400">300 mil seguidores</p>
          </div>
          <div>
            <Button class="bg-[#7E57C2]" style="border-radius: 30px;">Seguir</Button>
          </div>
      </div>
      
      <div class="border-r-2 px-[5%] py-4 flex flex-col items-center ">
        <div class="pb-2" style="cursor: pointer;">
            <CirclePlus/>
        </div>
        <div>
            <p>Adicionar a playlist</p>
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
        <p>{{ data.descricao }}</p>
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
