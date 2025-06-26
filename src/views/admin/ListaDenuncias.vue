<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue'
import UsuarioTable from '@/components/datatable/UsuarioTable.vue';
import { UserService } from '@/services/user.service';
import { reload } from '@firebase/auth';
import DataTableDenuncia from '@/components/datatable/DataTableDenuncia.vue';
import DenunciaService from '@/services/denuncia.service';
import columns from '@/components/datatable/denuncia.table';
import { Data } from '@/components/datatable/data.denuncias';

const URL = 'http://localhost:8000';


export default defineComponent({
  components: {
    DataTableDenuncia,
  },
  data() {
    return {
      columns,
      data: [] as Data[],
      id: 0,
    };
  },
  async mounted() {
    this.data = await this.loadItems(this.data);
    console.log('mounted', this.data);
    
    try {
      const response = await UserService.perfil()
      this.id = response.usuario.usuario_id
      // console.log('perfil', this.id);
      
    }
    catch(error) { console.log(error) }
    
  },
  methods: {
    async loadItems(items: any) {
      try {
        const response = await DenunciaService.listarDenuncias()
        console.log(response);
        
        items = response.denuncias.map((item: any) => ({
          denuncia_id: item.denuncia_id,
          nome_usuario: item.nome_completo,
          video_id: item.video_id,
          status: item.status,
          criado_em: this.formatDate(item.criado_em),
          status_video: item.status_video,
          titulo_video: item.titulo_video,
        }));
        console.log("items: ", items);

        return items;
      } catch (error) {
        //alert('Erro ao listar usuários.');
        console.error(error);
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
   
  }
});
</script>



<template>
    <main class="pb-16 pt-20 px-5 full w-full h-full flex justify-center content-center">
        DENUNCIAS
      <DataTableDenuncia 
      :data="data" 
      :columns="columns"
     />
    </main>
  </template>
  
  