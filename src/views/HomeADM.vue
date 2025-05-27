<script lang="ts">
import { defineComponent } from 'vue';
import { TagService } from '@/services/tag.service';
import { VideoService } from '@/services/video.service'
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import router from '@/routes';
import { UserService } from '@/services/user.service';

interface Video {
  id: number;
  usuario_id: number;
  nome: string;
  visualizacoes: number;
  imagem: string | null;
  tags: []
  nome_usuario: string
}

interface Tag {
  nome_tag: string;
}

export default defineComponent({
  components: {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Card,
    CardContent,
    Avatar,
    AvatarFallback,
    AvatarImage
  },
  data() {
    return {
      tags: [] as Tag[],
      videosByTag: [] as Video[],
      tagSelecionada: null as string | null,
      tipo: ''
    };
  },
  async mounted() {
    await this.getTags();
    this.videosByTag = await this.getVideosByTag(this.tagSelecionada);
    console.log('mounted: ',this.videosByTag);

    UserService.perfil()
    .then((response) => {
        console.log('perfil',response.usuario.tipo);
        this.tipo = response.usuario.tipo;
        
        
    })
    .catch((error) => console.log(error)
    )
    
  },
  methods: {
    async getTags() {
      try {
        const response = await TagService.listarTags();
        const todasTags = response.data.map((item: any) => item.nome_tag);

        const unicas = [...new Set(todasTags)] as string[];
        this.tags = unicas.map((nome: string) => ({ nome_tag: nome }));


      } catch (error) {
        console.error(error);
      }
    },

    async selecionarTag(nome: string | null) {
      this.tagSelecionada = nome;
      await this.getVideosByTag(nome);
    },
      async getVideosByTag(tagName: string | null) {
    try {
      if (!tagName) {

        const response = await VideoService.listarVideos()
        const data = await response.data.map((item:any) => ({
            id: item.video_id,
            usuario_id: item.usuario_id,
            nome: item.nome,
            imagem: item.imagem,
            visualizacoes: item.visualizacoes,
            nome_usuario: item.nome_usuario,
           
        }))
        
        return data;
      } else {
        const response = await TagService.listarVideosPorTags(tagName);
        this.videosByTag = response.data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          descricao: item.descricao,
          link: item.link,
          imagem: item.imagem,
          visualizacoes: item.visualizacoes,
          tags: item.tags,
          nome_usuario: item.nome_usuario
        }));
        console.log('data: ',this.videosByTag);

      }
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  },

  async goToPageVideWithId(id:number) {
    router.push({ name: 'Video.Visualizar', params: { id } })
  },
   async goToPerfilWithId(nome:string) {
    try {
      const response = await UserService.getUserByName(nome);
      const id = response.usuario_id
      console.log("id: ",id , " - ", response);
      router.push({ name: 'Usuario.Perfil', params: { id } })
    }
    catch (e) {
      console.log('EEROR: ',e);
      
    }
    //router.push({ name: 'Usuario.Perfil', params: { id } })
  }


  },

});
</script>



<template>
  <div class="p-10">
    ADM
  </div>
</template>


<style scoped>
.selecionada {
  background-color: #000;
  color: white;
  border-color: #0f5132;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
